chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const phishingData = message.phishingData;
    const status = document.getElementById('status');
    const keywordStatus = document.getElementById('keywords');

    let statusText = 'This site looks safe.';
    if (phishingData.phishingScore >= 3) {
        statusText = 'This site might be a phishing attempt!';
    }
    status.textContent = statusText;

    if (phishingData.detected_keywords.length > 0) {
        keywordStatus.textContent = "Suspicious keywords detected: " + phishingData.detected_keywords.join(", ");
    } else {
        keywordStatus.textContent = "No suspicious keywords found.";
    }
});

