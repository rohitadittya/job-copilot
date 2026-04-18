import { useState } from "react";
import { autofill } from "../../services/http/apply.services";
import { getUserProfile } from "../../utils/userprofile";

const Autofill = () => {
    const [formFields, setFormFields] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = (tabId, message) => {
        return new Promise((resolve, reject) => {
            chrome.tabs.sendMessage(tabId, message, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Message failed:", chrome.runtime.lastError.message);
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(response);
                }
            });
        });
    };

    const autofillFields = async () => {
        try {
            setLoading(true);

            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true,
            });

            const res = await sendMessage(tab.id, { type: "GET_FORM_FIELDS" });
            const mappedFields = await autofill(res.fields, getUserProfile());

            await sendMessage(tab.id, {
                type: "FILL_FIELDS",
                mappedFields,
            });

        } catch (err) {
            console.error("Autofill failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {formFields.length > 0 && (
                <pre className="text-xs mt-2">
                    {JSON.stringify(formFields.slice(0, 3), null, 2)}
                </pre>
            )}
            <button
                onClick={autofillFields}
                className="w-full bg-blue-500 text-white py-2 rounded"
            >
                {loading ? "Autofilling..." : "Autofill"}
            </button>
        </div>
    );
};

export default Autofill;