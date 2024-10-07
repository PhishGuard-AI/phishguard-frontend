chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const phishingData = message.phishingData;
    const status = document.getElementById('status');

    let statusText = 'This site looks safe.';
    if (phishingData.phishingScore >= 3) {
        statusText = 'This site might be a phishing attempt!';
    }
    status.textContent = statusText;
});
