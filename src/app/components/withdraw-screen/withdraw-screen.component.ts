import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs/Observable';
import { getCurrentUser } from '../../selectors';
import { User } from '../../reducers/users';
import {WithdrawRequest, SetActiveScreen, SetAlert} from '../../actions';

@Component({
  selector: 'withdraw-screen',
  templateUrl: './withdraw-screen.component.html',
  styleUrls: ['./withdraw-screen.component.css']
})

export class WithdrawScreenComponent implements OnInit {
  userId: string;

  constructor(private store: Store<fromRoot.State>, private cd: ChangeDetectorRef) {
    this.store.select(getCurrentUser).subscribe(u => this.userId = u.uid).unsubscribe();
  }

  ngOnInit() { }

  withdraw(amount: number) {
    this.store.dispatch(new SetAlert(null));
    this.store.dispatch(new WithdrawRequest({amount, userId: this.userId}));
  }

  navigateTo(screenId: any) {
    this.store.dispatch(new SetActiveScreen(screenId));
  }

}
