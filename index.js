#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from "chalk";
let balance = 10000; //Dollars
let pin = "1234";
let pinAnswer = await inquirer.prompt({
    name: "q1",
    message: "Please enter PIN-code : (1234)",
    type: "number",
});
if (pinAnswer.q1 == pin) {
    console.log(chalk.green("You have successfully logged in!"));
    let operationAns = await inquirer.prompt({
        name: "operation",
        message: "Please select option: ",
        type: "list",
        choices: ["Withdraw", "Check Balance", "Fast Cash"],
    });
    if (operationAns.operation === "Withdraw") {
        let amountAns = await inquirer.prompt({
            name: "amount",
            message: "Enter the amount you want to withdraw: $",
            type: "number",
        });
        if (amountAns.amount > balance) {
            console.log(chalk.bold.red(`Insufficient Balance ! You only have $${balance} left.`));
        }
        else {
            balance -= amountAns.amount;
            console.log(chalk.yellow(`Withdrawal successful! Your remaining balance is : $${balance}`));
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.blueBright(`Your current balance is $${balance}.`));
    }
    else if (operationAns.operation === "Fast Cash") {
        let fastCashAns = await inquirer.prompt({
            name: "fast_cash",
            message: "Please select the amount for your fast cash transaction: $",
            type: "list",
            choices: ["$500", "$1000", "$2000", "$5000"],
        });
        balance -= parseInt(fastCashAns.fast_cash.replace('$', ''));
        console.log(chalk.yellowBright(`Fast cash transaction successful! Your remaining balance is : $${balance}`));
    }
}
else {
    console.log(chalk.bold.redBright("Incorrect PIN"));
}
;
