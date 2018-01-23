import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromContext from '../reducers/context';
import * as fromRoot from '../reducers';

export const getRoot = (state: fromRoot.State) => state;

export const getCurrentScreen = createSelector(getRoot, (state: fromRoot.State) =>
  state.context.activeScreen
);

export const getIsActiveScreenPin = createSelector(getRoot, (state: fromRoot.State) =>
  state.context.activeScreen === fromContext.ScreenType.Pin
);

export const getIsActiveScreenHome = createSelector(getRoot, (state: fromRoot.State) =>
  state.context.activeScreen === fromContext.ScreenType.Home
);

export const getIsActiveScreenWithdraw = createSelector(getRoot, (state: fromRoot.State) =>
  state.context.activeScreen === fromContext.ScreenType.Withdraw
);

export const getIsActiveScreenDeposit = createSelector(getRoot, (state: fromRoot.State) =>
  state.context.activeScreen === fromContext.ScreenType.Deposit
);

export const getUsers = createSelector(getRoot, (state: fromRoot.State) => state.users );

export const getAlertMessage = createSelector(getRoot, (state: fromRoot.State) => state.context.alertMessage );

export const getCurrentUser = createSelector(getRoot, (state: fromRoot.State) =>
  state.users.find(u => u.uid === state.context.userId)
);

export const getCurrentUserTransactions = createSelector(getRoot, (state: fromRoot.State) =>
  state.transactions[state.context.userId]
);

export const getCurrentBalance = createSelector(getRoot, (state: fromRoot.State) => {
  if (!state.context.userId) { return null; }
  const txList = state.transactions[state.context.userId];
  return txList[txList.length - 1].balance;
});

export const getCurrentBalanceFormatted = createSelector(getRoot, (state: fromRoot.State) => {
  if (!state.context.userId) { return null; }
  const txList = state.transactions[state.context.userId];
  return formatMoney(txList[txList.length - 1].balance);
});


export function formatMoney(num: number): string {
  if (!num) { return '0.00'; }
  let str = `${Math.round(num * 100) / 100}`;
  str = str.includes('.') ? str : str + '.00'
  return str.length - str.indexOf('.') === 2 ? `${str}0` : str;
}
