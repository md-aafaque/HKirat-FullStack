/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function checkExist(transaction, categories) {
  for (let i = 0; i < categories.length; i++) {
    obj = categories[i];
    if (Object.values(obj).includes(transaction.category)) {
      return i;
    }
  }
  return undefined;
}

function calculateTotalSpentByCategory(transactions) {
  let categories = [];
  transactions.forEach(function (transaction) {
    let i = checkExist(transaction, categories);
    if (i != undefined) {
      categories[i].totalSpent += transaction.price;
      // categories.push(category);
    } else {
      categories.push({
        category: transaction.category,
        totalSpent: transaction.price,
      });
    }
  });
  return categories;
}

module.exports = calculateTotalSpentByCategory;
