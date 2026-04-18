import { useState } from "react";
import { getInsights } from "../../services/http/insights.services";
import { getPersonalizedDocumentByType } from "../../services/http/forge.services";

const CandidateMatch = () => {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(false);
    const [jd, setJd] = useState("");

    const analyzeJob = async () => {
        setLoading(true);

        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });

        const response = await chrome.tabs.sendMessage(tab.id, {
            type: "GET_JD",
        });

        const jobDescription = response.jd;
        setJd(jobDescription);

        const res = await getInsights(jobDescription);
        setInsights(res);
        setLoading(false);
    };

    const downloadDocument = async (type) => {
        const res = await getPersonalizedDocumentByType(type, jd);

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${type}.pdf`;
        a.click();
    };

    return (
        <div className="w-[350px] p-4 text-sm">
            <h1 className="text-lg font-bold mb-3">🚀 Job Copilot</h1>

            <button
                onClick={analyzeJob}
                className="w-full bg-blue-500 text-white py-2 rounded"
            >
                {loading ? "Analyzing..." : "Analyze Job"}
            </button>
            <button
                disabled={!jd}
                onClick={() => downloadDocument("resume")}
                className="w-full bg-blue-500 text-white py-2 rounded mt-2"
            >
                Download Resume
            </button>
            <button
                disabled={!jd}
                onClick={() => downloadDocument("coverletter")}
                className="w-full bg-blue-500 text-white py-2 rounded mt-2"
            >
                Download Cover Letter
            </button>

            {insights && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold">
                        Match: {insights.matchScore}%
                    </h2>
                    <p>{insights.recommendation}</p>
                    <p>{insights.reasoning}</p>

                    <div className="mt-2">
                        <h3 className="font-semibold">💪 Strengths</h3>
                        <ul className="list-disc ml-4">
                            {insights.strengths.map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-2">
                        <h3 className="font-semibold text-red-500">⚠️ Gaps</h3>
                        <ul className="list-disc ml-4">
                            {insights.gaps.map((g, i) => (
                                <li key={i}>{g}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CandidateMatch;