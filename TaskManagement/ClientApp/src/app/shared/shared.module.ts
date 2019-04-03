import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EjsScheduleComponent } from './ejs-schedule/ejs-schedule.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  imports: [
    CommonModule,
    ScheduleModule
  ],
  declarations: [
    EjsScheduleComponent
  ],
  exports: [
    EjsScheduleComponent
  ]
})
export class SharedModule { }
