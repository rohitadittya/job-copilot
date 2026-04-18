const getJobDescription = () => {
    return document.body.innerText;
};

const getFormFields = () => {
    const inputFields = document.querySelectorAll('input, textarea, select');

    const fields = Array.from(inputFields).map(element => {
        const label = element.labels?.[0]?.innerText || element.placeholder || element.name || "";

        return {
            tag: element.tagName.toLowerCase(),
            type: element.type,
            name: element.name,
            id: element.id,
            label: label.trim(),
            required: element.required
        }
    });

    return fields;
};

const fillFields = (mappedFields) => {
    const inputFields = document.querySelectorAll('input, textarea, select');

    inputFields.forEach(element => {
        const match = mappedFields.find(field => field.id === element.id || field.name === element.name);

        if (!match || match.value == null) {
            return;
        }

        if (element.type === "checkbox" || element.type === "radio") {
            element.checked = Boolean(match.value);
            element.dispatchEvent(new Event("change", { bubbles: true }));
            return;
        }

        if (element.tagName.toLowerCase() === "select") {
            element.value = match.value;
            element.dispatchEvent(new Event("change", { bubbles: true }));
            return;
        }

        element.value = match.value;
        element.dispatchEvent(new Event("input", { bubbles: true }));
    });
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === "GET_JD") {
        sendResponse({ jd: getJobDescription() });
        return true;
    }

    if (req.type === "GET_FORM_FIELDS") {
        sendResponse({ fields: getFormFields() });
        return true;
    }

    if (req.type === "FILL_FIELDS") {
        fillFields(req.mappedFields);
        sendResponse({ success: true });
        return true;
    }
});