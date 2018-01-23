import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { VerifyPin } from '../../actions';

@Component({
  selector: 'pin-screen',
  templateUrl: './pin-screen.component.html',
  styleUrls: ['./pin-screen.component.css']
})

export class PinScreenComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>, private cd: ChangeDetectorRef) { }

  ngOnInit() { }

  verifyPin(val) {
    this.store.dispatch(new VerifyPin(val));
  }
}
