const mockTransactions = {
  starbucks: {
    id: "starbucks",
    merchant: "Starbucks",
    category: "Food",
    amount: 400,
    time: "18:45",
    day: "Friday",
    location: "Bangalore",
    isLateNight: false
  },

  pharmacy: {
    id: "pharmacy",
    merchant: "Apollo Pharmacy",
    category: "Healthcare",
    amount: 1200,
    time: "23:03",
    day: "Tuesday",
    location: "Bangalore",
    isLateNight: true
  },

  myntra: {
    id: "myntra",
    merchant: "Myntra",
    category: "E-commerce",
    amount: 2500,
    time: "01:10",
    day: "Wednesday",
    location: "Bangalore",
    isLateNight: true
  },

  rent: {
    id: "rent",
    merchant: "House Rent",
    category: "Essential",
    amount: 15000,
    time: "09:00",
    day: "Monday",
    location: "Bangalore",
    isLateNight: false
  }
};

export function getTransactionContext(transactionId) {
  return mockTransactions[transactionId];
}
