let activeTabId = null;
let activeStartTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  trackTime(tab.url);
  activeTabId = activeInfo.tabId;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete') {
    trackTime(tab.url);
  }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    stopTracking();
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        trackTime(tabs[0].url);
      }
    });
  }
});

function trackTime(url) {
  const now = Date.now();

  // Only process valid HTTP/HTTPS URLs
  if (!url || !url.startsWith('http')) {
    activeStartTime = now;
    return;
  }

  if (activeStartTime && activeTabId !== null) {
    const timeSpent = now - activeStartTime;
    const hostname = new URL(url).hostname;

    chrome.storage.local.get([hostname], (result) => {
      const total = (result[hostname] || 0) + timeSpent;
      chrome.storage.local.set({ [hostname]: total });
    });
  }

  activeStartTime = now;
}

function stopTracking() {
  activeStartTime = null;
}