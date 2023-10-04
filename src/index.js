class Bank {
  constructor(name) {
    this.name = name;
    this.branches = [];
  }
  addBranch(branch) {
    if (!this.branches.includes(branch)) {
      this.branches.push(branch);
      return true;
    } else {
      return false;
    }
  }
  addCustomer(branch, customer) {
    if (this.branches.includes(branch)) {
      return branch.addCustomer(customer);
    } else {
      return false;
    }
  }

  addCustomerTransaction(branch, customerId, amount) {
    if (this.branches.includes(branch)) {
      return branch.addCustomerTransaction(customerId, amount);
    } else {
      return false;
    }
  }
  findBranchByName(branchName) {
    return this.branches.filter((branch) => branch.getName() === branchName);
  }

  checkBranch(branch) {
    return this.branches.includes(branch);
  }
  listCustomers(branch, includeTransactions) {
    const customers = branch.getCustomers();

    customers.forEach((customer) => {
      if (includeTransactions) {
        const transactions = customer.getTransactions();
        transactions.forEach((transaction) => {});
      }
    });
  }
}
//Customer class:done
class Customer {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.transactions = [];
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getTransactions() {
    return this.transactions;
  }
  getBalance() {
    let balance = 0;
    this.transactions.forEach((transaction) => {
      balance = balance + transaction.amount;
    });
    return balance;
  }
  addTransaction(amount) {
    if (amount >= 0) {
      const transaction = new Transaction(amount, new Date());
      this.transactions.push(transaction);
      return true;
    } else {
      return false;
    }
  }
}
//Branch class:done
class Branch {
  constructor(name) {
    this.name = name;
    this.customers = [];
  }
  getName() {
    return this.name;
  }
  getCustomers() {
    return this.customers;
  }
  addCustomer(customer) {
    if (!this.customers.includes(customer)) {
      this.customers.push(customer);
      return true;
    } else {
      return false;
    }
  }

  addCustomerTransaction(customerId, amount) {
    const customer = this.customers.find(
      (customer) => customer.id === customerId
    );
    if (customer) {
      return customer.addTransaction(amount);
    } else {
      return false;
    }
  }
}

// Trancsation class: Done
class Transaction {
  constructor(amount, date) {
    this.amount = amount;
    this.date = date;
  }
}

// Tests

const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);

arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);

console.log(arizonaBank.findBranchByName("bank"));
console.log(arizonaBank.findBranchByName("Sun"));

console.log(arizonaBank.addCustomer(westBranch, customer1));
console.log(arizonaBank.addCustomer(westBranch, customer3));
console.log(arizonaBank.addCustomer(sunBranch, customer1));
console.log(arizonaBank.addCustomer(sunBranch, customer2));

console.log(
  arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000)
);
console.log(
  arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000)
);
console.log(
  arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000)
);

console.log(customer1.addTransaction(-1000));
console.log(customer1.getBalance());

arizonaBank.listCustomers(westBranch, true);
arizonaBank.listCustomers(sunBranch, true);