import { ActionTypes } from '../actions';
import {init} from 'protractor/built/launcher';
import {NgTools_InternalApi_NG2_ExtractI18n_Options} from '@angular/compiler-cli/src/ngtools_api';

export enum ScreenType {
  Pin = 1,
  Home = 2,
  Withdraw = 3,
  Deposit = 4,
}

export interface State {
  activeScreen: ScreenType;
  userId: string;
  alertMessage: string;
}

const initialState: State = {
  activeScreen: ScreenType.Pin,
  userId: null,
  alertMessage: null,
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_SCREEN:
      return {...state, activeScreen: action.payload, alertMessage: null};
    case ActionTypes.PIN_VERIFIED:
      return {...initialState, activeScreen: ScreenType.Home, userId: action.payload };
    case ActionTypes.SET_ALERT:
      return {...state, alertMessage: action.payload};
    case ActionTypes.EXIT:
      return initialState;
    default:
      return state;
  }
}
