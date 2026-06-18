require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Account = require('./models/Account');
const Transaction = require('./models/Transaction');
const Loan = require('./models/Loan');
const SupportTicket = require('./models/SupportTicket');
const Investment = require('./models/Investment');

const usersData = [
  { name: 'Admin User', email: 'admin@bigibank.com', password: 'Password123!', role: 'admin', initialBalance: 50000 },
  { name: 'Rahul Sharma', email: 'rahul@bigibank.com', password: 'Password123!', role: 'user', initialBalance: 8000 },
  { name: 'Siddharth Deshai', email: 'siddharth@bigibank.com', password: 'Password123!', role: 'user', initialBalance: 89001 },
  { name: 'Nirav Patel', email: 'nirav@bigibank.com', password: 'Password123!', role: 'user', initialBalance: 500000 },
  { name: 'Rinkal Patel', email: 'rinkal@bigibank.com', password: 'Password123!', role: 'user', initialBalance: 100000 },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4
    });
    console.log('✅ Connected to MongoDB');

    // Clear DB
    await User.deleteMany();
    await Account.deleteMany();
    await Transaction.deleteMany();
    await Loan.deleteMany();
    await SupportTicket.deleteMany();
    await Investment.deleteMany();
    console.log('🧹 Cleared existing database records');

    // Create Users & Accounts
    const createdUsers = [];
    const createdAccounts = [];

    for (let i = 0; i < usersData.length; i++) {
      const u = usersData[i];
      // Distribute creation dates over the last 6 months for the growth chart
      const randomMonthOffset = Math.floor(Math.random() * 6);
      const createdAt = new Date();
      createdAt.setMonth(createdAt.getMonth() - randomMonthOffset);

      const user = await User.create({
        ...u,
        phone: `98765432${i.toString().padStart(2, '0')}`,
        isEmailVerified: true,
        kycStatus: 'verified',
        createdAt
      });
      createdUsers.push(user);

      const initialBalance = u.initialBalance;
      const account = await Account.create({
        userId: user._id,
        accountType: 'savings',
        balance: initialBalance,
        createdAt
      });
      createdAccounts.push(account);

      // Initial deposit transaction
      await Transaction.create({
        userId: user._id,
        toAccount: account._id,
        toAccountNumber: account.accountNumber,
        amount: initialBalance,
        type: 'credit',
        category: 'salary',
        description: 'Initial Deposit',
        status: 'completed',
        balanceAfter: initialBalance,
        createdAt
      });
    }
    console.log(`✅ Seeded ${createdUsers.length} users and ${createdAccounts.length} accounts`);

    // Create Transactions (including flagged)
    let flaggedCount = 0;
    for (let i = 0; i < 50; i++) {
      const isFlagged = Math.random() > 0.8 && flaggedCount < 12; // Try to get around 12 flagged
      if (isFlagged) flaggedCount++;

      const senderAcc = createdAccounts[Math.floor(Math.random() * createdAccounts.length)];
      const receiverAcc = createdAccounts[Math.floor(Math.random() * createdAccounts.length)];
      
      if (senderAcc._id.toString() !== receiverAcc._id.toString()) {
        const amount = Math.floor(Math.random() * 5000) + 100;
        
        await Transaction.create({
          userId: senderAcc.userId,
          fromAccount: senderAcc._id,
          toAccount: receiverAcc._id,
          toAccountNumber: receiverAcc.accountNumber,
          amount,
          type: 'debit',
          category: 'other',
          description: 'Transfer to ' + receiverAcc.accountNumber,
          status: 'completed',
          isFlagged,
          balanceAfter: senderAcc.balance - amount
        });

        await Transaction.create({
          userId: receiverAcc.userId,
          fromAccount: senderAcc._id,
          toAccount: receiverAcc._id,
          amount,
          type: 'credit',
          category: 'other',
          description: 'Transfer from ' + senderAcc.accountNumber,
          status: 'completed',
          balanceAfter: receiverAcc.balance + amount
        });
      }
    }
    console.log(`✅ Seeded 50+ transactions (Flagged: ${flaggedCount})`);

    // Create Loans
    const loanTypes = ['personal', 'home', 'education', 'vehicle'];
    for (let i = 0; i < 15; i++) {
      const user = createdUsers[Math.floor(Math.random() * (createdUsers.length - 1)) + 1]; // Skip admin
      const status = Math.random() > 0.5 ? 'submitted' : 'approved';
      const amount = Math.floor(Math.random() * 3000000) + 100000;
      
      await Loan.create({
        userId: user._id,
        loanType: loanTypes[Math.floor(Math.random() * loanTypes.length)],
        amount,
        tenure: 24,
        interestRate: 10.5,
        purpose: 'Investment or personal use',
        status,
        monthlyIncome: 80000,
        employmentStatus: 'salaried',
        creditScore: Math.floor(Math.random() * 200) + 600, // 600-800
      });
    }
    console.log('✅ Seeded loans');

    // Create Support Tickets
    for (let i = 0; i < 10; i++) {
      const user = createdUsers[Math.floor(Math.random() * (createdUsers.length - 1)) + 1];
      await SupportTicket.create({
        userId: user._id,
        subject: 'Issue with transfer',
        category: 'transaction',
        priority: 'medium',
        message: 'Need help with a recent transaction that failed.',
        status: Math.random() > 0.3 ? 'open' : 'closed',
      });
    }
    console.log('✅ Seeded support tickets');

    // Create Investments
    for (let i = 0; i < 20; i++) {
      const user = createdUsers[Math.floor(Math.random() * (createdUsers.length - 1)) + 1];
      await Investment.create({
        userId: user._id,
        name: 'Fixed Deposit ' + i,
        investmentType: 'fd',
        investedAmount: Math.floor(Math.random() * 500000) + 50000,
        currentValue: Math.floor(Math.random() * 550000) + 55000,
        tenure: 12,
        interestRate: 6.5,
        maturityDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        status: 'active'
      });
    }
    console.log('✅ Seeded investments');

    console.log('🎉 Full Database Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
