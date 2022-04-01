// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// Esse reducer será responsável por tratar as informações da pessoa usuária
import { REQUEST_DATA, GET_CURRENCIES, FAILED_REQUEST } from '../actions';

const INITIAL_STATE_WALLET = {
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
  case FAILED_REQUEST:
    newState.error = action.payload;
    break;
  default: return state;
  }
  return newState;
}

export default wallet;

/*
{
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: []
  }
}
*/
