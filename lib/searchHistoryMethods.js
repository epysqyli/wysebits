// methods related to searchHistory to be used in SearchInput component

const stringify = (historyArray) => JSON.stringify(historyArray);

const findOrCreateHistory = () => {
  if (localStorage.getItem("history") !== null) {
    return JSON.parse(localStorage.getItem("history"));
  } else {
    const history = [];
    localStorage.setItem("history", stringify(history));
    return JSON.parse(localStorage.getItem("history"));
  }
};

const addToHistory = (query) => {
  const history = findOrCreateHistory();
  history.push(query);
  localStorage.setItem("history", stringify(history));
};

const removeFromHistory = (result) => {
  const history = findOrCreateHistory();
  const newHistory = history.filter((item) => item !== result);
  localStorage.setItem("history", stringify(newHistory));
};

export { findOrCreateHistory, addToHistory, removeFromHistory };
