async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer ${OPENAI_API_KEY}"},
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        chatBox.innerHTML += `<p><strong>AI Tutor:</strong> ${botMessage}</p>`;
        document.getElementById("user-input").value = "";
    } catch (error) {
        console.error("Error:", error);
        chatBox.innerHTML += `<p><strong>AI Tutor:</strong> Error connecting to OpenAI.</p>`;
    }
}

