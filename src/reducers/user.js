// Esse reducer será responsável por tratar as informações da pessoa usuária
import { UPDATE_USER } from '../actions';

const INITIAL_STATE_USER = {
  email: '',
};

function user(state = INITIAL_STATE_USER, action) {
  switch (action.type) {
  case UPDATE_USER:
    return {
      ...state, email: action.email,
    };
  default: return state;
  }
}

export default user;
