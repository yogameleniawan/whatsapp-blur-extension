chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
        if (!changeInfo.url.startsWith("https://web.whatsapp.com/")) {
            chrome.tabs.sendMessage(tabId, { action: "disableExtension" });
        }
    }
});