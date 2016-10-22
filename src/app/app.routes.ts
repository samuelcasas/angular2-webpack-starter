import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about';
import { NoContent } from "./components/_shared/no-content/no-content";
import { AlreadyLoggedInGuard } from "./guards/already-logged-in.guard";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { LoggedInGuard } from "./guards/logged-in.guard";

// Here are located all the components generated, do not erase this comments
// App Components
import { HomeComponent } from "./components/home";
// END App Components

export const ROUTES: Routes = [
  { path: 'login', component: LoginFormComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: '', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: '**',    component: NoContent },
];
