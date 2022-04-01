// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
import { REQUEST_DATA, GET_CURRENCIES, ADD_EXPENSE, FAILED_REQUEST } from '../actions';

const INITIAL_STATE_WALLET = {
  id: 0,
  //  soma: '0',
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

function wallet(state = INITIAL_STATE_WALLET, action) {
  const newState = { ...state, isFetching: false, error: '' };
  switch (action.type) {
  case REQUEST_DATA:
    newState.isFetching = true;
    break;
  case GET_CURRENCIES:
    newState.currencies = action.payload;
    break;
  case ADD_EXPENSE: {
    const expense = { id: state.id, ...action.payload };
    /*
    const ask = parseFloat(expense.exchangeRates[expense.currency].ask);
    //    newState.soma = (parseFloat(newState.soma) + ask * parseFloat(expense.value)).toFixed(2);
    //    newState.soma = parseFloat(newState.soma) + ask * parseFloat(expense.value) + '';
    newState.soma = parseFloat(newState.soma) + ask * parseFloat(expense.value);
    newState.soma = `${Math.trunc(newState.soma * 100) / 100}`; */
    newState.id += 1;
    newState.expenses = [...newState.expenses, expense];
    break;
  }
  case FAILED_REQUEST:
    newState.error = action.payload;
    break;
  default: return state;
  }
  return newState;
}

export default wallet;
