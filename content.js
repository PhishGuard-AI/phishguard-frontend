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

// Check if TLD appears in the path (indicates a fake domain)
function checkTLDInPath(url) {
    const tlds = ['com', 'net', 'org', 'xyz', 'info'];
    return tlds.some(tld => url.includes('/' + tld + '/'));
}

// Check if subdomain structure is suspicious
function checkAbnormalSubdomain(hostname) {
    const knownBrands = ['google', 'facebook', 'paypal'];
    return knownBrands.some(brand => hostname.includes(brand) && !hostname.startsWith(brand));
}

// Send phishing feature analysis back to the background script
const phishingData = analyzeURL();
chrome.runtime.sendMessage({ phishingData: phishingData });
