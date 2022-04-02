// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_DATA, GET_CURRENCIES, ADD_EXPENSE, FAILED_REQUEST, DELETE_ITEM, EDIT_ITEM,
} from '../actions';

const INITIAL_STATE_WALLET = {
  id: 0,
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
    newState.id += 1;
    newState.expenses = [...newState.expenses, expense];
    break;
  }
  case FAILED_REQUEST:
    newState.error = action.payload;
    break;
  case DELETE_ITEM: {
    const newArray = [...newState.expenses];
    newArray.splice(action.payload, 1);
    newState.expenses = newArray;
    break;
  }
  case EDIT_ITEM: {
    const newArray = [...newState.expenses];
    const { value, description, currency, method, tag, editIndex } = action.payload;
    let editValue = newArray[editIndex];
    editValue = { ...editValue, value, description, currency, method, tag };
    newArray[editIndex] = editValue;
    newState.expenses = newArray;
    break;
  }
  default: return state;
  }
  return newState;
}

export default wallet;
