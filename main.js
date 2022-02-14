'use strict';
const assert = require('assert');

class BankAccount {
    constructor(accountNumber, owner) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.transactions = [];
    }

    balance() {
        let sum = 0;
        for (let i = 0; i < this.transactions.length; i++) {
            sum += this.transactions[i].amount;
        }
        return sum;
    }

    charge(payee, amt) {
        let currentBalance = this.balance();
        if (amt > currentBalance) {
            // do nothing
        } else {
            let chargeTransaction = new Transaction(-1 * amt, payee);
            this.transactions.push(chargeTransaction);
        }
    }

    deposit(amt) {
        if (amt > 0) {
            let depositTransaction = new Transaction(amt, 'Deposit');
            this.transactions.push(depositTransaction);
        }
    }
}

class Transaction {
    constructor(amount, payee) {
        this.date = new Date();
        this.amount = amount;
        this.payee = payee;
    }
}

class  SavingsAccount extends BankAccount {
    constructor(accountNumber, owner, interestRate) {
    super(accountNumber, owner);
    this.interestRate = interestRate;
}
accrueInterest(){
    let currentBalance = this.balance();
    let interestAmt = currentBalance * this.interestRate;
    let interestTransaction = new Transaction(interestAmt, 'Interest');
    this.transactions.push(interestTransaction);
  }
}


// Tests
// date - The date of the transaction
if (typeof describe === 'function') {
    const assert = require('assert');

    describe('# testing account creation', function () {
        it('should have a account number, owner name, and a transaction list', function () {
            let acct1 = new BankAccount('xx4432', 'John Doe');
            assert.equal(acct1.owner, 'John Doe');
            assert.equal(acct1.accountNumber, 'xx4432');
            assert.equal(acct1.transactions.length, 0);
            assert.equal(acct1.balance(), 0);
        });
    });

    describe('#testing account balance', function () {
        it('should create a new account correctly', function () {
            let acct1 = new BankAccount('xx4432', 'John Doe');
            assert.equal(acct1.balance(), 0);
            acct1.deposit(100);
            assert.equal(acct1.balance(), 100);
            acct1.charge('Target', 10);
            assert.equal(acct1.balance(), 90);
        });
        it('should not allow a negative deposit', function () {
            let acct1 = new BankAccount('xx4432', 'John Doe');
            assert.equal(acct1.balance(), 0);
            acct1.deposit(100);
            assert.equal(acct1.balance(), 100);
            acct1.deposit(-30);
            assert.equal(acct1.balance(), 100);
        });
        it('should not allow charging to overdraft', function () {
            let acct1 = new BankAccount('xx4432', 'John Doe');
            assert.equal(acct1.balance(), 0);
            acct1.charge('Target', 30);
            assert.equal(acct1.balance(), 0);
        });
        it('should allow a refund', function () {
            let acct1 = new BankAccount('xx4432', 'John Doe');
            assert.equal(acct1.balance(), 0);
            acct1.charge('Target', 30);
            assert.equal(acct1.balance(), 0);
        });
    });

    describe('#testing transaction creation', function () {
        it('should create transaction correctly for a deposit', function () {
            // create a new instance
            let Transaction1 = new Transaction(30, 'Deposit');
            assert.equal(Transaction1.amount, 30);
            assert.equal(Transaction1.payee, 'Deposit');
            assert.notEqual(Transaction1.date, undefined);
            assert.notEqual(Transaction1.date, null);
        });
        it('Should create a transaction correctly for a charge', function () {
            let Transaction1 = new Transaction(-34.45, 'Target');
            assert.equal(Transaction1.amount, -34.45);
            assert.equal(Transaction1.payee, 'Target');
            assert.notEqual(Transaction1.date, undefined);
            assert.notEqual(Transaction1.date, null);
        });
    });

    describe('Savings Account creation', function() {
        it('Create account correctly', function() {
            let saving = new SavingsAccount('xxx1234', 'Maddie Mortis', .10);
            assert.equal('xxx1234', saving.accountNumber);
            assert.equal('Maddie Mortis', saving.owner);
            assert.equal('.10', saving.interestRate);
            assert.equal(0, saving.balance());
        });
    });
    it('Accrue interest correctly', function() {
        let saving = new SavingsAccount('xxx1234', 'Maddie Mortis', .10);
        assert.equal('xxx1234', saving.accountNumber);
        assert.equal('Maddie Mortis', saving.owner);
        assert.equal(.10, saving.interestRate);
        assert.equal(0, saving.balance());
        saving.deposit(100);
        saving.accrueInterest();
        assert.equal(110, saving.balance());
    });
    it('Accrue interest correctly', function() {
        let saving = new SavingsAccount('xxx1234', 'Maddie Mortis', .10);
        saving.deposit(100);
        saving.charge('ATM', 30);
        saving.accrueInterest();
        assert.equal(77, saving.balance());
    });
}