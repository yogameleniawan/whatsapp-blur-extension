document.addEventListener('DOMContentLoaded', function () {
    initializeStorage()
    handleBlur("text-chat", "._ak8j", "textChat")
    handleBlur("contact-name", "._ak8q", "contact")
    handleBlur("contact-name", "._ak8q", "contact")
    handleBlur("profile-picture", "._ak8h", "profilePicture")
    handleBlur("text-message", "._akbu", "textMessage")
    handleBlur("image-message", "img.x15kfjtz.x1c4vz4f.x2lah0s.xdl72j9.x127lhb5.x4afe7t.xa3vuyk.x10e4vud", "imageMessage")
    handleBlur("document-message", "div.x9f619.x1o095ql.x1u9i22x.xjcl138.x1idk2jd.x1yt8dio", "documentMessage")
});


chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];
    if (tab.url.startsWith("https://web.whatsapp.com/")) {
        document.getElementById("status").innerText = "Whatsapp Blur Privacy";
    } else {
        document.getElementById("icon").src = ""
        document.getElementById("status").innerHTML = `
        <div class="alert alert-danger d-flex align-items-center" style="margin-top:10px"> 
            <svg width="24" height="24" 
                fill="currentColor"
                class="bi bi-exclamation-triangle-fill flex-shrink-0 mt-2"> 
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96  
                        0L.165 13.233c-.457.778.091 1.767.98  
                        1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 
                        1.566zM8 5c.535 0 .954.462.9.995l-.35  
                        3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905  
                        0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /> 
            </svg> 
            <div> 
                Extension Disabled. Make sure active tab is https://web.whatsapp.com/
            </div> 
        </div>
        `;
        document.getElementById("content").innerHTML = "";
    }
});

function initializeStorage() {
    var toggle_text = document.getElementById("text-chat");
    var contact_name = document.getElementById("contact-name");
    var profile_picture = document.getElementById("profile-picture");
    var text_message = document.getElementById("text-message");
    var image_message = document.getElementById("image-message");
    var document_message = document.getElementById("document-message");

    chrome.storage.sync.get('textChat', function (data) {
        toggle_text.checked = JSON.parse(data.textChat).val;
        if (toggle_text.checked) {
            document.getElementById("text-chat-blur").style.display = "flex";
            document.getElementById("text-chat-range").value = JSON.parse(data.textChat).blur;
            document.getElementById(`text-chat-range-value`).innerText = JSON.parse(data.textChat).blur;
        }
    });

    chrome.storage.sync.get('contact', function (data) {
        contact_name.checked = JSON.parse(data.contact).val;
        if (contact_name.checked) {
            document.getElementById("contact-name-blur").style.display = "flex";
            document.getElementById("contact-name-range").value = JSON.parse(data.contact).blur;
            document.getElementById(`contact-name-range-value`).innerText = JSON.parse(data.contact).blur;
        }
    });

    chrome.storage.sync.get('profilePicture', function (data) {
        profile_picture.checked = JSON.parse(data.profilePicture).val;
        if (profile_picture.checked) {
            document.getElementById("profile-picture-blur").style.display = "flex";
            document.getElementById("profile-picture-range").value = JSON.parse(data.profilePicture).blur;
            document.getElementById(`profile-picture-range-value`).innerText = JSON.parse(data.profilePicture).blur;
        }
    });

    chrome.storage.sync.get('textMessage', function (data) {
        text_message.checked = JSON.parse(data.textMessage).val;
        if (text_message.checked) {
            document.getElementById("text-message-blur").style.display = "flex";
            document.getElementById("text-message-range").value = JSON.parse(data.textMessage).blur;
            document.getElementById(`text-message-range-value`).innerText = JSON.parse(data.textMessage).blur;
        }
    });

    chrome.storage.sync.get('imageMessage', function (data) {
        image_message.checked = JSON.parse(data.imageMessage).val;
        if (image_message.checked) {
            document.getElementById("image-message-blur").style.display = "flex";
            document.getElementById("image-message-range").value = JSON.parse(data.imageMessage).blur;
            document.getElementById(`image-message-range-value`).innerText = JSON.parse(data.imageMessage).blur;
        }
    });

    chrome.storage.sync.get('documentMessage', function (data) {
        document_message.checked = JSON.parse(data.documentMessage).val;
        if (document_message.checked) {
            document.getElementById("document-message-blur").style.display = "flex";
            document.getElementById("document-message-range").value = JSON.parse(data.documentMessage).blur;
            document.getElementById(`document-message-range-value`).innerText = JSON.parse(data.documentMessage).blur;
        }
    });
}

function handleBlur(switchId, targetClass, key) {
    var toggle = document.getElementById(switchId);
    var slider = document.getElementById(`${switchId}-range`);

    let blur = 5;

    toggle.addEventListener('change', function (e) {
        if (this.checked) {
            blur = 5;
            document.getElementById(`${switchId}-blur`).style.display = "flex";
            document.getElementById(`${switchId}-range-value`).innerText = blur;
            chromeScripting()
        } else {
            document.getElementById(`${switchId}-blur`).style.display = "none";
            blur = 0;
            chromeScripting()
        }

        jsonString = JSON.stringify({
            'val': this.checked,
            'blur': blur
        });
        var jsonfile = {};
        jsonfile[key] = jsonString;

        chrome.storage.sync.set(jsonfile);
    })

    slider.addEventListener('input', function (e) {
        blur = e.target.value

        chrome.storage.sync.get(key, function () {
            jsonString = JSON.stringify({
                'val': true,
                'blur': blur
            });
            var jsonfile = {};
            jsonfile[key] = jsonString;

            chrome.storage.sync.set(jsonfile);
        });

        document.getElementById(`${switchId}-range-value`).innerText = blur;

        chromeScripting()
    })

    function chromeScripting() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.insertCSS({
                target: { tabId: tabs[0].id },
                css: `
                ${targetClass} {
                    filter: blur(${blur}px);
                } 
                ${targetClass}:hover {
                    filter: blur(0px);
                }
                `
            });
        });
    }
}