import { useState } from "react";

function App() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);


  const analyzeJob = async () => {
    setLoading(true);

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const response = await chrome.tabs.sendMessage(tab.id, {
      type: "GET_JD",
    });

    const jd = response.jd;

    const res = await fetch("http://localhost:5000/insights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jd }),
    });

    const data = await res.json();
    setInsights(data);
    setLoading(false);
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

      {insights && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">
            Match: {insights.matchScore}%
          </h2>

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
}

export default App;