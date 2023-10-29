const processTransactions = (transactions) => {
  if (!validateTransactions(transactions)) {
    throw new Error("Undefined collection of transactions");
  }

  return convertArrOfArraysToArrayOfStrings(
    sortByTransactionCountThenBySalesItem(
      convertObjToArr(convertArrToObjWithTransactionsCountValue(transactions))
    )
  );
};

const validateTransactions = (transactions) => {
  return transactions !== undefined;
};

const convertArrToObjWithTransactionsCountValue = (transactions) => {
  return transactions.reduce((obj, transaction) => {
    obj[transaction] = (obj[transaction] || 0) + 1;
    return obj;
  }, {});
};

const convertObjToArr = (arr) => {
  return Object.entries(arr);
};

const sortByTransactionCountThenBySalesItem = (arr) =>
  arr.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

const convertArrOfArraysToArrayOfStrings = (transactions) => {
  return transactions.map((transaction) => {
    return `${transaction[0]} ${transaction[1]}`;
  });
};

module.exports = processTransactions;
