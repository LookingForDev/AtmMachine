import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AtmEffects } from './effects';


import { AppComponent } from './app.component';
import { PinScreenComponent } from './components/pin-screen/pin-screen.component';
import { WithdrawScreenComponent } from './components/withdraw-screen/withdraw-screen.component';
import { DepositScreenComponent } from './components/deposit-screen/deposit-screen.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';


@NgModule({
  declarations: [
    AppComponent,
    PinScreenComponent,
    WithdrawScreenComponent,
    DepositScreenComponent,
    HomeScreenComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AtmEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
