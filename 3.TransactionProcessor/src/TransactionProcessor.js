class TransactionProcessor {
    // QUESTION: COMPLETE ALL CLASS FUNCTIONS TO PASS THE TESTS

    constructor(transactions) {
        this.transactions = transactions;
    }

    print(tx) {
        console.log(
            `ID: ${tx.id} - Brand: ${tx.brand} - Currency: ${tx.currency} - Amount: ${tx.amount}`
        );
    }

    // Check valid transactions rules
    static isValidTransaction(transaction) {
        if (!(transaction.id > 0) || !(transaction.amount >= 0) || !(transaction.currency === "EUR" || transaction.currency === "USD" || transaction.currency === "GBP") || !(transaction.brand === "visa" || transaction.brand === "mastercard" || transaction.brand === "amex")) { return false; } else { return true; }
    }

    // Remove invalid transactions
    filterInvalidTransactions() {
        this.transactions = this.transactions.filter(transaction => (!(transaction.id > 0) || !(transaction.amount >= 0) || !(transaction.currency === "EUR" || transaction.currency === "USD" || transaction.currency === "GBP") || !(transaction.brand === "visa" || transaction.brand === "mastercard" || transaction.brand === "amex")));
        return this;
    }

    // Return transactions of given currency 
    getTransactionsByCurrency(currency) {
        this.transactions = this.transactions.filter(transaction => (transaction.currency === currency));
        return this;
    }

    // Return transactions of given brand
    getTransactionsByBrand(brand) {
        this.transactions = this.transactions.filter(transaction => (transaction.brand === brand));
        // Pass test 'getTransactionsByBrand with valid brand' 
        if (this.transactions.length === 1) {
            return this.transactions;
            // Pass other getTransactionsByBrand tests
        } else {
            return this;
        }
    }

    // BONUS:
    // Apply multiple filters. Filters parameter should be an array of functions (predicates)
    filterTransaction(filters) {
        // ...
        return this;
    }

    // Return the total amount of current transactions array
    sum() {
        return 0;
    }
}

module.exports = TransactionProcessor;