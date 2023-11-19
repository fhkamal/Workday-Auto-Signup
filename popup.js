function createAccount() {
    const email = document.getElementById("uniqueID").value;
    localStorage["inputText"] = email;
    // Wuery the active tab, which will be only one tab and inject the script in it.
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['content_script.js']})
    })
    
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.scripting.executeScript({args: [localStorage["inputText"]], target: {tabId: tabs[0].id}, function: signUp})
    })
    
}

function signUp(input){
    
    function addChar(chars){
        return chars.charAt(Math.floor(Math.random() * chars.length))
    }

    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = ',./!@#$%^&*()?'

    var password = '';
    password += addChar(upperCase);
    password += addChar(lowerCase);
    password += addChar(numbers);
    password += addChar(special);
    for (var i = 0; i < 4; i++){
        password += addChar(upperCase + lowerCase + numbers + special);
    }

    setTimeout(() => {
        var emailInput = document.getElementById("input-6");
        emailInput.value = input;
        var pass1 = document.getElementById("input-7");
        var pass2 = document.getElementById("input-8");
        pass1.value = password;
        pass2.value = password;
    }, 1000);

    setTimeout(() => {
        var checkBox = document.getElementById("input-10");
        if (checkBox != null){
            checkBox.click();
        }
    }, 500);
}
document.getElementById('clickactivity').addEventListener('click', createAccount);

