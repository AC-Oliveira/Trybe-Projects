// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  WALLET_CURRENCY, DELETE_EXPENSE, EDIT_EXPENSE, ADD_EXPENSE_ATT_CURR,
  UPDATE_EXPENSE } from '../actions';

// Sugestão dada do Ygor Lage.
let previous = '';

export const DEFAULT_WALLET_STATE = { editor: false,
  idToEdit: null,
  currencies: [],
  expenses: [] };

function walletData(state = DEFAULT_WALLET_STATE, action) {
  switch (action.type) {
  case WALLET_CURRENCY:
    return { ...state, currencies: action.payload };

  case ADD_EXPENSE_ATT_CURR:
    return { ...state,
      expenses: [...state.expenses, action.payload] };

  case DELETE_EXPENSE:
    // Ref: https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-remove-an-item-from-an-array/301447 Link Passado pelo camarada Rod
    return { ...state,
      expenses: [...state.expenses.slice(0, action.payload),
        ...state.expenses.slice(action.payload + 1, state.expenses.length)] };
  case EDIT_EXPENSE:
    return { ...state, idToEdit: action.payload, editor: true };

  case UPDATE_EXPENSE:
    previous = { ...state };
    // eslint-disable-next-line no-case-declarations
    console.log(state);
    console.log(action);
    previous.expenses[action.payload.id] = { ...action.payload };
    previous.editor = false;
    previous.idToEdit = null;
    return { ...previous };

  default:
    return state;
  }
}

export default walletData;
