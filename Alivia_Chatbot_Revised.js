const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function generateChatNumber(customerNumber, orderNumber) {
    return customerNumber.substring(0, 3) + orderNumber.slice(-4);
}

function checkExistingOrder(customerName, customerNumber, orderNumber) {
    console.log(`Hello, ${customerName}! An agent will be with you shortly.`);
    const orderStatus = "In Progress"; // You can change this to "Delayed" or "Shipped"
    console.log(`Agent: Thank you for waiting, ${customerName}. I am checking the order status for you.`);
    console.log(`Agent: Your order status is: ${orderStatus}`);
    const chatNumber = generateChatNumber(customerNumber, orderNumber);
    console.log(`Agent: Your chat reference number is: ${chatNumber}`);
    rl.close();
}

function placeNewOrder() {
    let customerName, donutType, donutQuantity, customerEmail, contactNumber, optIn;

    rl.question("Please enter your name: ", (name) => {
        customerName = name;

        function askForEmail() {
            rl.question("Please enter your email address: ", (email) => {
                customerEmail = email;

                function askForContactNumber() {
                    rl.question("Please enter your contact number: ", (number) => {
                        contactNumber = number;

                        rl.question("Do you want to opt in to receive messages for orders and updates? (Y/N): ", (response) => {
                            optIn = response.toLowerCase() === 'y';

                            function askForDonutOrder() {
                                rl.question("Please specify the type of donut you want or type 'done' to complete your order: ", (type) => {
                                    if (type.toLowerCase() === 'done') {
                                        console.log("Agent: Thank you for stopping by Krispy's Donut Shop!");
                                        rl.close();
                                    } else {
                                        donutType = type;
                                        rl.question("How many donuts would you like to order? ", (quantity) => {
                                            donutQuantity = quantity;

                                            console.log(`Agent: Thank you for waiting, ${customerName}. I am checking the order status for you.`);
                                            const orderStatus = "In Progress"; // You can change this to "Delayed" or "Shipped"
                                            console.log(`Agent: Your order status is: ${orderStatus}`);
                                            console.log(`Agent: You have ordered ${donutQuantity} ${donutType} donut(s).`);
                                            console.log(`Agent: We will send order updates to ${customerEmail}.`);
                                            if (optIn) {
                                                console.log(`Agent: We will also send updates to ${contactNumber}.`);
                                            } else {
                                                console.log(`Agent: You have opted out of receiving messages at ${contactNumber}.`);
                                            }
                                            console.log("Agent: Thank you for stopping by Krispy's Donut Shop!");
                                            rl.close();
                                        });
                                    }
                                });
                            }

                            askForDonutOrder();
                        });
                    });
                }

                askForContactNumber();
            });
        }

        askForEmail();
    });
}

rl.question("Are you checking an existing order or would you like to place a new order? (Enter 'existing' or 'new'): ", (choice) => {
    if (choice.toLowerCase() === 'existing') {
        rl.question("Please enter your name: ", (name) => {
            rl.question("Please enter your 5-digit customer number: ", (customerNumber) => {
                rl.question("Please enter your 8-digit order number: ", (orderNumber) => {
                    checkExistingOrder(name, customerNumber, orderNumber);
                });
            });
        });
    } else if (choice.toLowerCase() === 'new') {
        placeNewOrder();
    } else {
        console.log("Invalid choice. Please enter 'existing' or 'new'.");
        rl.close();
    }
});
