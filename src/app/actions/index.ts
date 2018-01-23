import { Action } from '@ngrx/store';

export const ActionTypes = {
  SET_ACTIVE_SCREEN:  '[App] Set the Active Screen',
  VERIFY_PIN:         '[App] Verify Pin',
  PIN_VERIFIED:       '[APP] Pin Verified',
  INVALID_PIN:        '[App] Verify Pin',
  SET_ALERT:          '[App] Set the alert message',
  EXIT:               '[App] End the Session for the user',
  DEPOSIT:            '[Deposit] Deposit a specified amount',
  WITHDRAW_REQUEST:   '[Withdraw] Request a specified amount to Withdraw',
  WITHDRAW:           '[Withdraw] Request approved, Withdraw a specified amount',
};

export class SetActiveScreen implements Action {
  readonly type = ActionTypes.SET_ACTIVE_SCREEN;
  constructor(public payload: any) {}
}

export class PinVerified implements Action {
  readonly type = ActionTypes.PIN_VERIFIED;
  constructor(public payload: string) {}
}

export class VerifyPin implements Action {
  readonly type = ActionTypes.VERIFY_PIN;
  constructor(public payload: string) {}
}

export class InvalidPin implements Action {
  readonly type = ActionTypes.VERIFY_PIN;
  constructor(public payload: string) {}
}

export class SetAlert implements Action {
  readonly type = ActionTypes.SET_ALERT;
  constructor(public payload: string) {}
}

export class Exit implements Action {
  readonly type = ActionTypes.EXIT;
  constructor() {}
}

export class Deposit implements Action {
  readonly type = ActionTypes.DEPOSIT;
  constructor(public payload: { amount: number, userId: string }) {}
}

export class WithdrawRequest implements Action {
  readonly type = ActionTypes.WITHDRAW_REQUEST;
  constructor(public payload: { amount: number, userId: string }) {}
}

export class Withdraw implements Action {
  readonly type = ActionTypes.WITHDRAW;
  constructor(public payload: { amount: number, userId: string }) {}
}
