import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {Observable} from 'rxjs/Observable';
import {getCurrentUser} from '../../selectors';
import { User } from '../../reducers/users';
import { ScreenType } from '../../reducers/context';
import {SetActiveScreen} from '../../actions';

@Component({
  selector: 'home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>, private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  navigateTo(screenId: any) {
    this.store.dispatch(new SetActiveScreen(screenId));
  }

}
