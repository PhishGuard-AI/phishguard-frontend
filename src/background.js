chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const features = message.phishingData;

    // Basic phishing heuristics
    let phishingScore = 0;
    if (features.length_url > 75) phishingScore++;
    if (features.nb_dots > 3) phishingScore++;
    if (features.nb_hyphens > 2) phishingScore++;
    if (features.nb_at > 0) phishingScore++;
    if (!features.https_token) phishingScore++;
    if (features.punycode) phishingScore++;
    if (features.nb_subdomains > 2) phishingScore++;
    if (features.tld_in_path) phishingScore++;
    if (features.abnormal_subdomain) phishingScore++;

    // Keyword detection logic - increase score if phishing keywords are found
    if (features.detected_keywords.length > 0) phishingScore += features.detected_keywords.length;

    // If phishingScore exceeds a certain threshold, show an alert
    if (phishingScore >= 3) {
        chrome.action.setBadgeText({ text: "!" });
        chrome.action.setBadgeBackgroundColor({ color: "red" });
        alert("Warning: This website might be a phishing attempt! Detected keywords: " + features.detected_keywords.join(", "));
    } else {
        chrome.action.setBadgeText({ text: "" });
    }
});
