var txr = [];

function processTransactions(transActions) {
  txr = [];

  if (!validateTransactions(transActions)) {
    throw new Error("Undefined collection of transactions");
  }

  let txCount = transActions.reduce((acc, transaction) => {
    acc[transaction] = (acc[transaction] || 0) + 1;
    return acc;
  }, {});

  txCount = sortByAmountThenName(txCount);

  // Place them back in array for returning
  /* Object.keys(txCount).forEach(function (key, index) {
    txr[index] = `${key} ${txCount[key]}`;
  }); */

  txr = Object.keys(txCount).map((key) => `${key} ${txCount[key]}`);

  return txr;
}

function sortByAmountThenName(txCount) {
  let sortedKeys = Object.keys(txCount).sort(function sortingFunction(
    itemOne,
    itemTwo
  ) {
    return (
      txCount[itemTwo] - txCount[itemOne] ||
      itemOne > itemTwo ||
      -(itemOne < itemTwo)
    );
  });

  let sortedResults = {};
  for (let objectKey of sortedKeys) {
    sortedResults[objectKey] = txCount[objectKey];
  }

  return sortedResults;
}

function validateTransactions(transactions) {
  return transactions ? true : false;
}

module.exports = processTransactions;
