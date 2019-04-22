import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { from } from 'rxjs';

import { ScheduleModule, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { SchedulerService } from './scheduler.service';
import { SchedulerComponent } from './scheduler.component';

export const routes = [
  { path: '', component: SchedulerComponent, pathMatch: 'full', data: { title: 'Manage Lead' } },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ScheduleModule
  ],
  declarations: [
    SchedulerComponent
  ],
  providers: [
    SchedulerService,
    DayService, WeekService, WorkWeekService, MonthService, AgendaService
  ],
  exports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchedulerModule {
  static routes = routes;
}
