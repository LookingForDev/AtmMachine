import { ActionTypes } from '../actions';

export interface User {
  pin: string;
  username: string;
  uid: string;
}

const initialState: User[] = [
  {pin: '1111', username: 'Alice', uid: '1'},
  {pin: '2222', username: 'Brian', uid: '2'},
  {pin: '3333', username: 'Chris', uid: '3'},
  {pin: '4444', username: 'Diane', uid: '4'},
];

export function reducer(state = initialState, action: any): User[] {
  return state;
}

