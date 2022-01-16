// methods related to searchHistory to be used in SearchInput component

// define booksHistory and authorsHistory

const clearHistory = (historyName) => localStorage.setItem(historyName, []);

const stringify = (historyArray) => JSON.stringify(historyArray);

const resizeHistoryArrayToTen = (historyArray) => historyArray.shift();

const findOrCreateHistory = () => {
  if (localStorage.getItem("history") !== null) {
    return JSON.parse(localStorage.getItem("history"));
  } else {
    localStorage.setItem("history", stringify([]));
    return JSON.parse(localStorage.getItem("history"));
  }
};

const addToHistory = (query) => {
  const history = findOrCreateHistory();
  if (history.length > 9) resizeHistoryArrayToTen(history);
  history.push(query);
  localStorage.setItem("history", stringify(history));
};

const removeFromHistory = (result) => {
  const history = findOrCreateHistory();
  const newHistory = history.filter((item) => item !== result);
  localStorage.setItem("history", stringify(newHistory));
};

export { findOrCreateHistory, addToHistory, removeFromHistory, clearHistory };
