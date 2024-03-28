chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == "disableExtension") {
        document.getElementById("content").classList = "d-none"
    }
});