document.addEventListener('DOMContentLoaded', function () {
    textChatBlurHandler()
    initializeStorage()
});

function initializeStorage() {
    var toggle_text = document.getElementById("text-chat");

    chrome.storage.sync.get('textChat', function (data) {
        toggle_text.checked = data.textChat;
    });
}

function textChatBlurHandler() {
    var toggle = document.getElementById("text-chat");

    toggle.addEventListener('change', function () {
        chrome.storage.sync.set({ textChat: this.checked });

        chrome.storage.sync.get('textChat', function (data) {
            this.checked = data.textChat;
        });

        if (this.checked) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: () => {
                        var _ak8j = document.body.querySelector('._ak8j');

                        _ak8j.style.filter = 'blur(10px)';
                    }
                });
            });
        } else {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: () => {
                        var _ak8j = document.body.querySelector('._ak8j');

                        _ak8j.style.filter = 'blur(0px)';
                    }
                });
            });
        }
    });
}