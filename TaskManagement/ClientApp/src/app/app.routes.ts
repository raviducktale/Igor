import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [{
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'scheduler', loadChildren: './scheduler/scheduler.module#SchedulerModule'
  },
  {
    path: 'lead', loadChildren: './lead/lead.module#LeadModule'
  },
];
