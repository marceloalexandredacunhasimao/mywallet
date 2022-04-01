import REQUEST_DATA from '../actions';

const INITIAL_STATE_REQUEST = {
  isFetching: false,
};

function request(state = INITIAL_STATE_REQUEST, action) {
  switch (action.type) {
  case REQUEST_DATA: return { ...state, isFetching: true };
  default: return state;
  }
}

export default request;
