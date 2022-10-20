// Coloque aqui suas actions
export const LOGIN = 'LOGIN_ACTION';
export const WALLET_CURRENCY = 'WALLET_CURRENCY';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const ADD_EXPENSE_ATT_CURR = 'ADD_EXPENSE_ATT_CURR';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

const economyAPI = 'https://economia.awesomeapi.com.br/json/all';

const setLogin = (payload) => ({ type: LOGIN, payload });

export const setCurrency = (payload) => ({ type: WALLET_CURRENCY, payload });

export const listExpenses = (payload) => ({ type: ADD_EXPENSE_ATT_CURR, payload });

export const deleteExpense = (payload) => ({ type: DELETE_EXPENSE, payload });

export const editExpense = (payload) => ({ type: EDIT_EXPENSE, payload });

export const getSecondThunk = (expense) => async (dispatch) => {
  const response = await fetch(economyAPI);
  const exchangeRates = await response.json();
  const obj = { ...expense, exchangeRates };
  dispatch(listExpenses(obj));
};

export const updateExpense = (payload) => ({
  type: UPDATE_EXPENSE,
  payload,
});

export const getThirdThunk = (expense) => async (dispatch) => {
  const response = await fetch(economyAPI);
  const exchangeRates = await response.json();
  const obj = { ...expense, exchangeRates };
  dispatch(updateExpense(obj));
};
export const getCurrencyThunk = () => async (dispatch) => {
  const response = await fetch(economyAPI);
  const currenciesJson = await response.json();
  const payload = Object.keys(currenciesJson);
  payload.splice(1, 1);
  dispatch(setCurrency(payload));
};

export default setLogin;
