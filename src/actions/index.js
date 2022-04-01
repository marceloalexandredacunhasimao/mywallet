const UPDATE_USER = 'UPDATE_USER';
// const UPDATE_WALLET = 'UPDATE_WALLET';
// const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
const REQUEST_DATA = 'REQUEST_DATA';
const GET_CURRENCIES = 'GET_CURRENCIES';
const FAILED_REQUEST = 'FAILED_REQUEST';

const actionUser = (email) => ({
  type: UPDATE_USER,
  email,
});

// const actionWallet = () => ({ type: UPDATE_WALLET });

const actionRequestData = () => ({ type: REQUEST_DATA });

const actionGetCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

const actionFailedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

const actionFetchCurrencies = () => async (dispatch) => {
  dispatch(actionRequestData());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
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

// export { UPDATE_USER, UPDATE_WALLET, actionUser, actionWallet };
export {
  UPDATE_USER,
  REQUEST_DATA,
  GET_CURRENCIES,
  FAILED_REQUEST,
  actionUser,
  actionFetchCurrencies,
};
