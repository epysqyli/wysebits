// methods related to searchHistory to be used in SearchInput component

// define booksHistory and authorsHistory

const clearHistory = (historyName) => localStorage.setItem(historyName, []);

const stringify = (historyArray) => JSON.stringify(historyArray);

const resizeHistoryArrayToTen = (historyArray) => historyArray.shift();

const findOrCreateHistory = (historyName) => {
  if (localStorage.getItem(historyName) !== null) {
    return JSON.parse(localStorage.getItem(historyName));
  } else {
    localStorage.setItem(historyName, stringify([]));
    return JSON.parse(localStorage.getItem(historyName));
  }
};

const addToHistory = (query, historyName) => {
  const history = findOrCreateHistory(historyName);
  if (history.length > 9) resizeHistoryArrayToTen(history);
  history.push(query);
  localStorage.setItem(historyName, stringify(history));
};

const removeFromHistory = (result, historyName) => {
  const history = findOrCreateHistory(historyName);
  const newHistory = history.filter((item) => item !== result);
  localStorage.setItem(historyName, stringify(newHistory));
};

export { findOrCreateHistory, addToHistory, removeFromHistory, clearHistory };
