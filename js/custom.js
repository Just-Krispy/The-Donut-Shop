const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");

function appendMessage(message, isAgent) {
    const messageText = isAgent ? ` ${message}` : ` ${message}`;
    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = messageText;
    messageParagraph.className = isAgent ? "system-message" : "user-response";
    chatContainer.insertBefore(messageParagraph, userInput);
}

function handleUserResponse(response) {
    response = response.toLowerCase();

    if (!userState) {
        if (response === 'existing') {
            userState = 'existing';
            appendMessage("Please enter your name:", true);
        } else if (response === 'new') {
            userState = 'new';
            appendMessage("Please enter your name:", true);
        } else {
            appendMessage("Invalid choice. Please enter 'existing' or 'new'.", true);
        }
    } else if (userState === 'new') {
        // ... your existing logic ...

        if (response === 'done') {
            appendMessage(`Thank you for stopping by Krispy's Donut Shop!`, true);
            userInput.style.display = 'none';
            // Scroll to the bottom
            window.scrollTo(0, document.body.scrollHeight + 1000);
        }
    }

    setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 0);
}

userInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter" || event.key === "Return") {
        event.preventDefault();
        const response = userInput.value;
        userInput.value = "";
        appendMessage(response, false);
        handleUserResponse(response);
    }
});

let userState = '';
let customerName = '';
let customerEmail = '';
let contactNumber = '';
let optIn;
let donutType = '';
let donutQuantity = '';
