import {ChangeDetectorRef, Component, OnInit, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {Observable} from 'rxjs/Observable';
import {getCurrentUser} from '../../selectors';
import { User } from '../../reducers/users';
import { ScreenType } from '../../reducers/context';
import {SetActiveScreen, Deposit} from '../../actions';

@Component({
  selector: 'deposit-screen',
  templateUrl: './deposit-screen.component.html',
  styleUrls: ['./deposit-screen.component.css']
})
export class DepositScreenComponent implements OnInit {
  userId: string;

  constructor(private store: Store<fromRoot.State>, private cd: ChangeDetectorRef) {
    this.store.select(getCurrentUser).subscribe(u => this.userId = u.uid).unsubscribe();
  }

  ngOnInit() { }

  deposit(amount: number) {
    this.store.dispatch(new Deposit({amount, userId: this.userId}));
  }

  navigateTo(screenId: any) {
    this.store.dispatch(new SetActiveScreen(screenId));
  }

}
