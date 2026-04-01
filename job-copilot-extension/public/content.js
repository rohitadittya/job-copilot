function getJobDescription() {
    return document.body.innerText;
}
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === "GET_JD") {
        sendResponse({ jd: getJobDescription() });
        return true;
    }
});