// methods related to searchHistory to be used in SearchInput component

const stringify = (historyArray) => JSON.stringify(historyArray);

const findOrCreateHistory = () => {
  if (localStorage.getItem("history") !== null) {
    return JSON.parse(localStorage.getItem("history"));
  } else {
    localStorage.setItem("history", stringify([]));
    return JSON.parse(localStorage.getItem("history"));
  }
};

const resizeHistoryArrayToTen = (historyArray) => historyArray.shift();

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

const clearHistory = () => localStorage.setItem("history", []);

export { findOrCreateHistory, addToHistory, removeFromHistory, clearHistory };
