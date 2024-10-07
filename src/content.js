// Function to extract all text content from the webpage
function extractPageText() {
    return document.body.innerText.toLowerCase();
}

// Keyword detection function
function detectKeywords(text, keywords) {
    const detectedKeywords = keywords.filter(keyword => text.includes(keyword));
    return detectedKeywords;
}

// URL analysis function
function analyzeURL() {
    const url = window.location.href;
    const hostname = window.location.hostname;

    const phishingFeatures = {
        length_url: url.length,
        nb_dots: (url.match(/\./g) || []).length,
        nb_hyphens: (url.match(/-/g) || []).length,
        nb_at: (url.match(/@/g) || []).length,
        nb_qm: (url.match(/\?/g) || []).length,
        nb_and: (url.match(/&/g) || []).length,
        nb_eq: (url.match(/=/g) || []).length,
        https_token: url.startsWith("https"),
        punycode: hostname.includes("xn--"),
        nb_subdomains: hostname.split('.').length - 2,
        tld_in_path: checkTLDInPath(url),
        abnormal_subdomain: checkAbnormalSubdomain(hostname)
    };

    return phishingFeatures;
}

// Keywords to detect
const phishingKeywords = ["login", "password", "credit card", "bank account", "secure", "verify", "paypal", "account update", "enter your details", "security check"];

// Run URL analysis
const phishingData = analyzeURL();

// Run keyword detection
const pageText = extractPageText();
const detectedKeywords = detectKeywords(pageText, phishingKeywords);
phishingData.detected_keywords = detectedKeywords;

// Send phishing feature analysis back to the background script
chrome.runtime.sendMessage({ phishingData: phishingData });
