const userProfile = {
  balance: 18500,

  budgets: {
    food: {
      limit: 2000,
      spent: 1900
    },
    entertainment: {
      limit: 3000,
      spent: 2400
    }
  },

  goals: [
    {
      name: "Laptop",
      target: 25000,
      saved: 12000
    }
  ],

  recurringPayments: [
    {
      name: "Rent",
      amount: 15000,
      dueInDays: 1
    }
  ]
};

export function getUserProfile() {
  return userProfile;
}
