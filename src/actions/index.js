const url = 'https://economia.awesomeapi.com.br/json/all';

const UPDATE_USER = 'UPDATE_USER';
const REQUEST_DATA = 'REQUEST_DATA';
const GET_CURRENCIES = 'GET_CURRENCIES';
const ADD_EXPENSE = 'ADD_EXPENSE';
const FAILED_REQUEST = 'FAILED_REQUEST';
const DELETE_ITEM = 'DELETE_ITEM';
const EDIT_ITEM = 'EDIT_ITEM';

const actionUser = (email) => ({
  type: UPDATE_USER,
  email,
});

const actionRequestData = () => ({ type: REQUEST_DATA });

const actionGetCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

const actionAddExpanse = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

const actionFailedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

const actionFetchCurrencies = () => async (dispatch) => {
  dispatch(actionRequestData());
  try {
    const response = await fetch(url);
    const data = await response.json();
    const currencies = [];
    Object.keys(data).forEach((key) => {
      if (key !== 'USDT') {
        currencies.push(data[key].code);
      }
    });
    dispatch(actionGetCurrencies(currencies));
  } catch (error) {
    dispatch(actionFailedRequest(error));
  }
};

const actionFetchExpanse = (forms) => async (dispatch) => {
  dispatch(actionRequestData());
  try {
    const response = await fetch(url);
    const data = await response.json();
    const exchangeRates = data;
    const expense = { ...forms, exchangeRates };
    dispatch(actionAddExpanse(expense));
  } catch (error) {
    dispatch(actionFailedRequest(error));
  }
};

const actionDeleteItem = (index) => (
  {
    type: DELETE_ITEM,
    payload: index,
  }
);

const actionEditItem = (data) => (
  {
    type: EDIT_ITEM,
    payload: data,
  }
);

export {
  UPDATE_USER,
  REQUEST_DATA,
  GET_CURRENCIES,
  ADD_EXPENSE,
  FAILED_REQUEST,
  DELETE_ITEM,
  EDIT_ITEM,
  actionUser,
  actionFetchCurrencies,
  actionFetchExpanse,
  actionDeleteItem,
  actionEditItem,
};
