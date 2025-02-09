// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const messageInput = document.getElementById("messageInput");
    const messagesContainer = document.getElementById("messagesContainer");
    const sendButton = document.getElementById("sendMessage");

    // Add event listener for sending messages
    sendButton.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default form submission

        const message = messageInput.value.trim(); // Get and sanitize input

        if (message) {
            // Append the user message to the messages container
            appendMessage("You", message, "user-message");

            // Simulate a bot reply with a short delay
            setTimeout(() => {
                const botReply = getBotReply(message);
                appendMessage("Ben", botReply, "bot-message");
            }, 1000); // 1-second delay

            messageInput.value = ""; // Clear input field
        }
    });

    // Function to append a message to the chat
    function appendMessage(sender, text, type) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message", type);
        messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll
    }

// Function to generate bot replies (better matching)
function getBotReply(userMessage) {
    userMessage = userMessage.toLowerCase(); // Convert message to lowercase

    // Split the message into individual words for better matching
    const words = userMessage.split(" ");

    if (userMessage.includes("hello") || userMessage.includes("hi")) {
        return "Hello! tmrw u free? 😊";
    } 
    else if (words.includes("nothing") && words.includes("much") || userMessage.includes("study")) {
        return "Okayy, library?";
    } 
    else if (userMessage.includes("okay can") || userMessage.includes("see you")) {
        return "See u bro, byebye! 🎉";
    } 
    else {
        return "Hello??";
    }
}

});
