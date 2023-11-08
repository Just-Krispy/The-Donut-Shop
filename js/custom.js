<!DOCTYPE html>
<html>
<head>
    <title style="font-size: 4em">Donut Talk</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(180deg, #c55bd4, #f36c3d);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-size: 2em;
        }
        #chat-container {
            background: rgba(255, 255, 255, 0.8);
            text-align: center;
            border: 1px solid #ccc;
            padding: 20px;
            max-width: 800px;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
            border-radius: 20px;
        }
        #chat-container p {
            text-align: left;
            font-size: 1em;
        }
        h1 {
            color: #fff;
            font-size: 192px;
            margin-top: 40px;
        }
        #user-input {
            width: 80%;
            padding: 20px;
            color: black;
            font-size: 1em;
            border-radius: 20px;
        }
        .system-message {
            color: #8B4513;
            font-size: 1em;
        }
        body, #chat-container {
            border-radius: 20px;
        }
    </style>
</head>
<body>
    <h1>Donut Talk</h1>
    <div id="chat-container">
        <p class="system-message">Are you checking an existing order or would you like to place a new order? (Enter 'existing' or 'new')</p>
        <input type="text" id="user-input" placeholder="Your response here" />
    </div>
    <script>
        const chatContainer = document.getElementById("chat-container");
        const userInput = document.getElementById("user-input");

        function appendMessage(message, isAgent) {
            const messageText = isAgent ? `Dough: ${message}` : `You: ${message}`;
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
                if (!customerName) {
                    customerName = response;
                    appendMessage("Please enter your email address:", true);
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
                        appendMessage(`Dough: Thank you for stopping by Krispy's Donut Shop!`, true);
                        userInput.style.display = 'none';
                    } else {
                        donutType = response;
                        appendMessage("How many donuts would you like to order?", true);
                    }
                } else if (!donutQuantity) {
                    donutQuantity = response;
                    appendMessage(`Thank you for waiting, ${customerName}. I am checking the order status for you.`);
                    const orderStatus = "In Progress";
                    appendMessage(`Dough: Your order status is: ${orderStatus}`);
                    appendMessage(`Dough: You have ordered ${donutQuantity} ${donutType} donut(s).`);
                    appendMessage(`Dough: We will send order updates to ${customerEmail}.`);
                    if (optIn) {
                        appendMessage(`Dough: We will also send updates to ${contactNumber}.`);
                    } else {
                        appendMessage(`Dough: You have opted out of receiving messages at ${contactNumber}.`);
                    }
                    appendMessage("Dough: Thank you for stopping by Krispy's Donut Shop!");
                }
            }
        }

        userInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
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
    </script>
</body>
</html>