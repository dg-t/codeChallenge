const transactions = require("./src/examples/transactions");
const TransactionProcessor = require("./src/TransactionProcessor");

console.log("*** Payvision transaction processor ***");
const processor = new TransactionProcessor();

transactions.forEach(tx => {
    processor.print(tx);
    if ((tx.id > 0) && (tx.amount >= 0) && (tx.currency === "EUR" || tx.currency === "USD" || tx.currency === "GBP") && (tx.brand === "visa" || tx.brand === "mastercard" || tx.brand === "amex")) {
        console.log("Congratulation! Your transaction has been accepted");
    } else if (!(tx.id > 0)) {
        console.log("We are sorry, your transaction could not been finalized because your ID is invalid");
    } else if (!(tx.amount >= 0)) {
        console.log("We are sorry, your transaction could not been finalized because your amount is negative");
    } else if (!(tx.currency === "EUR" || tx.currency === "USD" || tx.currency === "GBP")) {
        console.log("We are sorry, your transaction could not been finalized because your currency is invalid");
    } else if (!(tx.brand === "visa" || tx.brand === "mastercard" || tx.brand === "amex")) {
        console.log("We are sorry, your transaction could not been finalized because your card brand is invalid");
    } else {
        console.log("We are sorry, your transaction could not been finalized because of an unknow error");
    }
});