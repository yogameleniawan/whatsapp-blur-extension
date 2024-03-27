document.addEventListener('DOMContentLoaded', function () {
    initializeStorage()
    handleBlur("text-chat", "._ak8j", "textChat")
    handleBlur("contact-name", "._ak8q", "contact")
    handleBlur("contact-name", "._ak8q", "contact")
    handleBlur("profile-picture", "._ak8h", "profilePicture")
    handleBlur("text-message", "._akbu", "textMessage")
});

function initializeStorage() {
    var toggle_text = document.getElementById("text-chat");
    var contact_name = document.getElementById("contact-name");
    var profile_picture = document.getElementById("profile-picture");
    var text_message = document.getElementById("text-message");

    chrome.storage.sync.get('textChat', function (data) {
        toggle_text.checked = JSON.parse(data.textChat).val;
    });

    chrome.storage.sync.get('contact', function (data) {
        contact_name.checked = JSON.parse(data.contact).val;
    });

    chrome.storage.sync.get('profilePicture', function (data) {
        profile_picture.checked = JSON.parse(data.profilePicture).val;
    });

    chrome.storage.sync.get('textMessage', function (data) {
        text_message.checked = JSON.parse(data.textMessage).val;
    });
}

function handleBlur(switchId, targetClass, key) {
    var toggle = document.getElementById(switchId);

    toggle.addEventListener('change', function (e) {

        testPrefs = JSON.stringify({
            'val': this.checked,
        });
        var jsonfile = {};
        jsonfile[key] = testPrefs;
        chrome.storage.sync.set(jsonfile);

        if (this.checked) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                function executeFunction(targetClass) {
                    var targetComponent = document.body.querySelectorAll(targetClass);

                    for (let i = 0; i < targetComponent.length; i++) {
                        targetComponent[i].style.filter = 'blur(10px)';
                    }

                }
                chrome.scripting.executeScript({
                    args: [targetClass],
                    target: { tabId: tabs[0].id },
                    function: executeFunction,
                });
            });
        } else {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                function executeFunction(targetClass) {
                    var targetComponent = document.body.querySelectorAll(targetClass);

                    for (let i = 0; i < targetComponent.length; i++) {
                        targetComponent[i].style.filter = 'blur(0px)';
                    }
                }
                chrome.scripting.executeScript({
                    args: [targetClass],
                    target: { tabId: tabs[0].id },
                    function: executeFunction,
                });
            });
        }
    })
}