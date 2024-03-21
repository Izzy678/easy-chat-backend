import {io}  from 'socket.io-client';
const socket = io('http://localhost:4000');




const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to add a new message to the UI
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<span class="sender">${sender}:</span> <span class="message-content">${message}</span>`;
    messageContainer.appendChild(messageElement);
    // Scroll to the bottom of the message container
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Event listener for sending a message
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        // You'll need to send the message to your backend here
        // For example, using WebSocket or HTTP request
        // Once the message is sent successfully, you can add it to the UI
        addMessage('You', message);
        socket.emit('sent-message',message)
        socket.on('recieve-message',(message)=>{
            addMessage('Him', message);
        })
        // Clear the message input field
        messageInput.value = '';
    }
});
