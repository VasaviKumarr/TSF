const customers = [
    { id: 1, name: "Yegnesh", email: "Yegnesh@gmail.com", balance: 6000 },
    { id: 2, name: "Pragnya", email: "Pragnya@gmail.com", balance: 5200 },
    { id: 3, name: "Praveen", email: "Praveen@gmail.com", balance: 5400 },
    { id: 4, name: "Vishal", email: "Vishal@gmail.com", balance: 8000 },
    { id: 5, name: "Kishore", email: "Kishore@gmail.com", balance: 4300 },
    { id: 6, name: "Dinesh", email: "Dinesh@gmail.com", balance: 3300 },
    { id: 7, name: "Neetesh", email: "Neetesh@gmail.com", balance: 5000 },
    { id: 8, name: "Shreya", email: "Shreya@gmail.com", balance: 3700 },
    { id: 9, name: "Govind", email: "Govind@gmail.com", balance: 7000 },
    { id: 10, name: "Saikiran", email: "Saikiran@gmail.com", balance: 6500 },
    // Add more customers as needed
];

const transactions = [];

function loadCustomers() {
    const customerList = document.getElementById('customer-list');
    customerList.innerHTML = '';

    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>$${customer.balance.toFixed(2)}</td>
            <td><a href="#" onclick="loadSendMoneyPage(${customer.id})">Send Money</a></td>
        `;
        customerList.appendChild(row);
    });

    showPage('customers-page');
}

function loadSendMoneyPage(customerId) {
    const sendMoneyPage = document.getElementById('send-money-page');
    sendMoneyPage.innerHTML = `
        <h2>Send Money</h2>
        <label for="amount">Amount: </label>
        <input type="number" id="amount" placeholder="Enter amount">
        <button onclick="completeTransaction(${customerId})">Send Money</button>
        <a href="#" onclick="loadCustomerDetails(${customerId})">Go Back</a>
    `;

    showPage('send-money-page');
}

function completeTransaction(receiverId) {
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const senderId = 1; // Assuming the logged-in user is always the first customer
    const sender = customers.find(c => c.id === senderId);
    const receiver = customers.find(c => c.id === receiverId);

    if (sender.balance < amount) {
        alert("Insufficient funds for the transaction.");
        return;
    }

    // Update balances
    sender.balance -= amount;
    receiver.balance += amount;

    // Record the transaction
    transactions.push({
        sender: sender.name,
        receiver: receiver.name,
        amount: amount
    });

    alert(`Transaction of $${amount.toFixed(2)} completed successfully`);

    loadTransactionHistoryPage();
}

function loadTransactionHistoryPage() {
    const historyList = document.getElementById('transaction-history-list');
    historyList.innerHTML = '';

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.sender} sent $${transaction.amount.toFixed(2)} to ${transaction.receiver}`;
        historyList.appendChild(listItem);
    });

    showPage('transaction-history-page');
}

function loadHomePage() {
    showPage('home-page');
}

function showPage(pageId) {
    const pages = ['home-page', 'customers-page', 'send-money-page', 'transaction-history-page'];
    pages.forEach(page => {
        const element = document.getElementById(page);
        if (page === pageId) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

loadHomePage();

