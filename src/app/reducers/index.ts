import {ActionReducer, ActionReducerMap, combineReducers, compose} from '@ngrx/store';
import { ActionTypes } from '../actions';
import * as fromContext from './context';
import * as fromUsers from './users';
import * as fromTransactions from './transactions';

export interface State {
  context: fromContext.State;
  users: fromUsers.User[];
  transactions: any;
}

export const reducers: ActionReducerMap<State> = {
  context: fromContext.reducer,
  users: fromUsers.reducer,
  transactions: fromTransactions.reducer,
};


