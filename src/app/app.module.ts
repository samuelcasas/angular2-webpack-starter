import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { NoContent } from "./components/_shared/no-content/no-content";
import { Navbar } from "./components/_shared/navbar/navbar.component";
import { LockerModule, Locker, LockerConfig, DRIVERS } from 'angular2-locker'
import { provideAuth } from 'angular2-jwt';
import { UserService } from "./services/user.service";
import { AlreadyLoggedInGuard } from "./guards/already-logged-in.guard";
import { LoggedInGuard } from "./guards/logged-in.guard";
import { LoginFormComponent } from "./components/login-form/login-form.component";

let lockerConfig = new LockerConfig('mxp',DRIVERS.LOCAL, '-');

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  UserService,
  AlreadyLoggedInGuard,
  LoggedInGuard,
  provideAuth({
    headerPrefix: 'Bearer',
    tokenGetter: ()=> new Locker(lockerConfig).get('token') ,
    globalHeaders: [{'Content-Type':'application/json'}],
    noJwtError: true,
    noTokenScheme: true
  })
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

// Here are located all the components generated, do not erase this comments
// App Components
import { HomeComponent } from "./components/home";
// END App Components

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    NoContent,
    LoginFormComponent,
    Navbar,
    HomeComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    LockerModule.forRoot(lockerConfig),
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

