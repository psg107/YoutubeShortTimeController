const URL = 'youtube.com/shorts/';

chrome.tabs.onUpdated.addListener((tabId , info, tab) => {
    if (!tab.url.includes(URL)) {
        return;
    }
    if (info.status !== 'complete') {
        return;
    }

    chrome.scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        files: ['activate.js']
    });
});