const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");

function appendMessage(message, isAgent) {
    const messageText = isAgent ? ` ${message}` : ` ${message}`;
    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = messageText;
    messageParagraph.className = isAgent ? "system-message" : "user-response";
    chatContainer.insertBefore(messageParagraph, userInput);

    if (messageText.includes("Thank you for stopping by Krispy's Donut Shop!")) {
        triggerSprinkleAnimation();
    }
}

function triggerSprinkleAnimation() {
    const sprinkleContainer = document.getElementById("sprinkle-container");
    sprinkleContainer.classList.add("active");
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
                appendMessage("Please specify the type of donut you want or type 'done' to complete your order:", true);
            } else if (response === 'n') {
                optIn = false;
                appendMessage("Please specify the type of donut you want or type 'done' to complete your order:", true);
            } else {
                appendMessage("Invalid choice. Please enter 'Y' or 'N'.", true);
            }
        } else if (!donutType) {
            if (response === 'done') {
                appendMessage(`Thank you for stopping by Krispy's Donut Shop!`, true);
                userInput.style.display = 'none';
            } else {
                donutType = response;
                appendMessage("How many donuts would you like to order?", true);
            }
        } else if (!donutQuantity) {
            donutQuantity = response;
            appendMessage(`Thank you for waiting, ${customerName}. I am checking the order status for you.`);
            const orderStatus = "In Progress";
            appendMessage(`Your order status is: ${orderStatus}`);
            appendMessage(`You have ordered ${donutQuantity} ${donutType} donut(s).`);
            appendMessage(`We will send order updates to ${customerEmail}.`);
            if (optIn) {
                appendMessage(`We will also send updates to ${contactNumber}.`);
            } else {
                appendMessage(`You have opted out of receiving messages at ${contactNumber}.`);
            }
            appendMessage("Thank you for stopping by Krispy's Donut Shop!");
        }
    }

    
    setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;

        
        if (response === 'done') {
            window.scrollTo(0, document.body.scrollHeight + 1000); 
        }
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
