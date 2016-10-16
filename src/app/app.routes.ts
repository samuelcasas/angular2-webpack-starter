import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

// Here are located all the components generated, do not erase this comments
// App Components
// END App Components

export const ROUTES: Routes = [

  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
  },
  { path: '',      component: HomeComponent },
  { path: '**',    component: NoContentComponent },
];
