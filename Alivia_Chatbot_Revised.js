const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function generateChatNumber(customerNumber, orderNumber) {
    return customerNumber.substring(0, 3) + orderNumber.slice(-4);
}

function checkOrderStatus() {
    rl.question("Please enter your name: ", (name) => {
        rl.question("Please enter your 5-digit customer number: ", (customerNumber) => {
            rl.question("Please enter your 8-digit order number: ", (orderNumber) => {
                console.log(`Hello, ${name}! An agent will be with you shortly.`);
                const orderStatus = "In Progress"; // You can change this to "Delayed" or "Shipped"
                console.log(`Agent: Thank you for waiting. I am checking the order status for you.`);
                console.log(`Agent: Your order status is: ${orderStatus}`);
                const chatNumber = generateChatNumber(customerNumber, orderNumber);
                console.log(`Agent: Your chat reference number is: ${chatNumber}`);
                rl.close();
            });
        });
    });
}

checkOrderStatus();
