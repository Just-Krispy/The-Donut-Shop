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
    response = response.trim().toLowerCase();

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
        if (!customerName) {
            customerName = response.charAt(0).toUpperCase() + response.slice(1);
            appendMessage(`Please enter your email address, ${customerName}:`, true);
        } else if (!customerEmail) {
            customerEmail = response;
            appendMessage("Please enter your contact number:", true);
        } else if (!contactNumber) {
            contactNumber = response;
            appendMessage("Do you want to opt in to receive messages for orders and updates? (Y/N):", true);
        } else if (typeof optIn !== 'boolean') {
            if (response === 'y') {
                optIn = true;
                appendMessage("Please specify the type of donut you want?", true);
            } else if (response === 'n') {
                optIn = false;
                // Move to the next question
                appendMessage("Please specify the type of donut you want?", true);
            } else {
                appendMessage("Invalid choice. Please enter 'Y' or 'N'.", true);
            }
        } else if (!donutType) {
            donutType = response;
            appendMessage("How many donuts would you like to order?", true);
        } else if (!donutQuantity) {
            donutQuantity = response;

            // Customize the success message here
            appendMessage(`Thank you, your order has been placed and you will be notified via the provided contact information. Thank you for checking out Donut Talk!`, false);
            document.querySelector("#chat-container p:last-child").classList.add("success-message");

            // Clearing user state and other variables for a fresh start
            userState = '';
            customerName = '';
            customerEmail = '';
            contactNumber = '';
            optIn = undefined;
            donutType = '';
            donutQuantity = '';
            userInput.style.display = 'none';  // Hiding the input field after order completion
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
