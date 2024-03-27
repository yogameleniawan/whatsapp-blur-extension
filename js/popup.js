document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('changeColor');
    button.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: changeWhatsAppColor
            });
        });
    });
});

function changeWhatsAppColor() {
    document.body.style.backgroundColor = 'red';
}