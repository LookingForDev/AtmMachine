import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/mergeMap';
import {ActionTypes, PinVerified, SetAlert, Withdraw} from '../actions';
import { State } from '../reducers';
import * as selectors from '../selectors';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';
import { empty } from 'rxjs/observable/empty';


@Injectable()
export class AtmEffects {
  constructor(
    private store$: Store<State>,
    private actions$: Actions
  ) { }

  @Effect()
  verifyPin$: Observable<Action> = this.actions$
    .ofType(ActionTypes.VERIFY_PIN)
    .map(toPayload)
    .withLatestFrom(this.store$.select(selectors.getUsers))
    .switchMap(([pin, users]) => {
      const user = users.find(u => u.pin === pin);

      if (!user) {
        return of(new SetAlert('Invalid Pin!'));
      }

      return of(new PinVerified(user.uid));
    });

  @Effect()
  withdrawRequest$: Observable<Action> = this.actions$
    .ofType(ActionTypes.WITHDRAW_REQUEST)
    .map(toPayload)
    .withLatestFrom(
      this.store$.select(selectors.getCurrentUserTransactions),
      this.store$.select(selectors.getCurrentBalance)
    )
    .switchMap(([payload, history, balance]): Observable<Action>   => {
      const reqAmount = Number(payload.amount);

      if ((balance - reqAmount) < 0) {
        return of(new SetAlert('Insufficient Funds!'));
      }

      const WITHDRAW_LIMIT = 1000;
      let reqAmountToday = reqAmount;
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setHours(23, 59, 59, 999);

      history.forEach(t => {
        if (!t.isDeposit && t.timestamp.getTime() > start.getTime() && t.timestamp.getTime() < end.getTime()){
          reqAmountToday += Math.abs(t.amount);
        }
      });

      const limitDiff =  WITHDRAW_LIMIT - reqAmountToday;
      if (limitDiff < 0) {
        return of(new SetAlert(`The requested amount exceeds the daily limit by $${Math.abs(limitDiff)}!`));
      }

      return of(new Withdraw(payload));
    });
}
