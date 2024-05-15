const apiUrl = 'https://api.green-api.com';

async function apiRequest(method, endpoint, body = null) {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;
    const url = `${apiUrl}/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;
    
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        document.getElementById('response').value = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('response').value = `Error: ${error}`;
    }
}

function getSettings() {
    apiRequest('GET', 'getSettings');
}

function getStateInstance() {
    apiRequest('GET', 'getStateInstance');
}

function sendMessage() {
    const chatId = document.getElementById('chatIdMessage').value + '@c.us';
    const message = document.getElementById('message').value;
    const body = {
        chatId: chatId,
        message: message
    };
    apiRequest('POST', 'sendMessage', body);
}

function sendFileByUrl() {
    const chatId = document.getElementById('chatIdFile').value + '@c.us';
    const url = document.getElementById('fileUrl').value;
    const body = {
        chatId: chatId,
        url: url,
        filename: url.split('/').pop()
    };
    apiRequest('POST', 'sendFileByUrl', body);
}
