const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function generateChatNumber(customerNumber, orderNumber) {
    return customerNumber.substring(0, 3) + orderNumber.slice(-4);
}

function checkOrderStatus() {
    let customerName, customerNumber, orderNumber, donutType, donutQuantity;

    rl.question("Please enter your name: ", (name) => {
        customerName = name;
        rl.question("Please enter your 5-digit customer number: ", (cNumber) => {
            customerNumber = cNumber;
            rl.question("Please enter your 8-digit order number: ", (oNumber) => {
                orderNumber = oNumber;

                console.log(`Hello, ${customerName}! An agent will be with you shortly.`);

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
                                console.log(`Agent: You have ordered ${donutQuantity} ${donutType} donut(s). Thank you for stopping by Krispy's Donut Shop!`);
                                askForDonutOrder();
                            });
                        }
                    });
                }

                askForDonutOrder();
            });
        });
    });
}

checkOrderStatus();
