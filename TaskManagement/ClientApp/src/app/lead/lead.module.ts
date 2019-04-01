import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeadComponent } from './lead.component';
import { LeadService } from './lead.service';
import { AddEditLeadComponent } from './add-edit-lead/add-edit-lead.component';
import { FormsModule } from '@angular/forms';

import { CallComponent } from './call/call.component';
import { CallService } from './call/call.service';
import { CommentComponent } from './comment/comment.component';
import { CommentService } from './comment/comment.service';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task/task.service';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingService } from './meeting/meeting.service';


import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SchedulerComponent } from './scheduler/scheduler.component';

export const routes = [
  { path: '', component: LeadComponent, pathMatch: 'full', data: { title: 'Manage Lead' } },
  { path: 'add', component: AddEditLeadComponent, data: { title: 'Add' } },
  { path: 'add/:id', component: AddEditLeadComponent, data: { title: 'Edit' } },
  { path: 'task', component: TaskComponent, data: { title: 'Edit' } },
  { path: 'comment', component: CommentComponent, data: { title: 'Edit' } },
  { path: 'meeting', component: MeetingComponent, data: { title: 'Edit' } },
  { path: 'call', component: CallComponent, data: { title: 'Edit' } }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    UiSwitchModule,
    HttpClientModule,ScheduleModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LeadComponent,
    AddEditLeadComponent,
    CallComponent,
    CommentComponent,
    TaskComponent,
    MeetingComponent,
    SchedulerComponent,
  ],
  providers: [
    LeadService,
    CallService,
    CommentService,
    TaskService,
    MeetingService
  ],
  exports: [
    //LoaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeadModule {
  static routes = routes;
}
