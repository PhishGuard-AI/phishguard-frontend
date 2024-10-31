// Request phishing data from background script
chrome.runtime.sendMessage({ phishingData: { /* Your phishing data here */ } }, (response) => {
    const status = document.getElementById('status');
    const phishingScore = response.phishingScore;
    const classification = response.classification;

    let statusText = 'This site looks safe.';
    if (phishingScore >= 3) {
        statusText = 'This site might be a phishing attempt!';
    }

    // Set the status text
    status.textContent = `${statusText} (Classification: ${classification})`;

    // Optionally, set background color based on classification
    const popup = document.body;
    if (classification === "Dangerous") {
        popup.style.backgroundColor = "red";
    } else if (classification === "Suspicious") {
        popup.style.backgroundColor = "orange";
    } else {
        popup.style.backgroundColor = "lightgreen";
    }
});
