// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions/index';

export const DEFAULT_USER_STATE = { email: '' };

function globalEmail(state = DEFAULT_USER_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.payload };

  default:
    return state;
  }
}

export default globalEmail;
