import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './reducers';
import * as fromContext from './reducers/context';
import * as contextSelectors from './selectors';
import * as Actions from './actions';
import {User} from './reducers/users';
import {getCurrentUser} from './selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  screen$: Observable<fromContext.ScreenType>;
  isActiveScreenPin$: Observable<boolean>;
  isActiveScreenHome$: Observable<boolean>;
  isActiveScreenWithdraw$: Observable<boolean>;
  isActiveScreenDeposit$: Observable<boolean>;
  alertMessage$: Observable<string>;
  currentBalance$: Observable<string>;
  user$: Observable<User>;

  constructor(private store: Store<fromRoot.State>, private cd: ChangeDetectorRef) {
    this.store = store;
    this.screen$ = this.store.select(contextSelectors.getCurrentScreen);
    this.isActiveScreenPin$ = this.store.select(contextSelectors.getIsActiveScreenPin);
    this.isActiveScreenHome$ = this.store.select(contextSelectors.getIsActiveScreenHome);
    this.isActiveScreenWithdraw$ = this.store.select(contextSelectors.getIsActiveScreenWithdraw);
    this.isActiveScreenDeposit$ = this.store.select(contextSelectors.getIsActiveScreenDeposit);
    this.currentBalance$ = this.store.select(contextSelectors.getCurrentBalanceFormatted);
    this.alertMessage$ = this.store.select(contextSelectors.getAlertMessage);
    this.user$ = this.store.select(getCurrentUser);
  }

  exit() {
    this.store.dispatch(new Actions.Exit());
  }

}
