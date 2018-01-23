import {ActionTypes} from '../actions';
import {State} from './context';

const initialState: any = {
  '1': [
    { timestamp: new Date(2018, 0, 1), isDeposit: true, amount: 1.00, balance: 1.75 },
    { timestamp: new Date(2018, 0, 1), isDeposit: false, amount: -1.00, balance: 0.75 },
  ],
  '2': [
    { timestamp: new Date(2018, 0, 1), isDeposit: true, amount: 10000.00, balance: 10000.00 },
  ],
  '3': [
    { timestamp: new Date(2018, 0, 1), isDeposit: true, amount: 7000.50, balance: 7000.50 },
  ],
  '4': [
    { timestamp: new Date(2018, 0, 1), isDeposit: true, amount: 100, balance: 100 },
    { timestamp: new Date(2018, 0, 1), isDeposit: false, amount: -20, balance: 80 },
  ],
};

function appendTransactionToState(uid, newRecord, currentState): State {
  const table = [...currentState[uid]];
  table.push(newRecord);
  const newState = {...currentState, [uid]: table};
  return newState;
}

function calcBalance(state, userId, offsetAmount) {
  return state[userId][state[userId].length - 1].balance + offsetAmount;
}

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.WITHDRAW:
      const newWithdraw = {
        timestamp: new Date(),
        isDeposit: false,
        amount: - Number(action.payload.amount),
        balance: calcBalance(state, action.payload.userId, - Number(action.payload.amount))
      };
      return appendTransactionToState(action.payload.userId, newWithdraw, state);
    case ActionTypes.DEPOSIT:
      const newDeposit = {
        timestamp: new Date(),
        isDeposit: true,
        amount: Number(action.payload.amount),
        balance: calcBalance(state, action.payload.userId, Number(action.payload.amount))
      };
      return appendTransactionToState(action.payload.userId, newDeposit, state);
    default: {
      return state;
    }
  }
}
