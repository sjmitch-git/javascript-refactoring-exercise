let txr = [];

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

  txr = Object.keys(txCount).map((key) => `${key} ${txCount[key]}`);

  return txr;
}

function sortByAmountThenName(txCount) {
  const sortedResults = Object.keys(txCount)
    .sort((a, b) => txCount[b] - txCount[a] || a.localeCompare(b))
    .reduce((acc, key) => {
      acc[key] = txCount[key];
      return acc;
    }, {});

  return sortedResults;
}

function validateTransactions(transactions) {
  return transactions !== undefined && transactions !== null;
}

module.exports = processTransactions;
