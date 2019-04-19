import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeadComponent } from './lead.component';
import { LeadService } from './lead.service';
import { AddEditLeadComponent } from './add-edit-lead/add-edit-lead.component';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CallComponent } from './call/call.component';
import { CallService } from './call/call.service';
import { CommentComponent } from './comment/comment.component';
import { CommentService } from './comment/comment.service';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task/task.service';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingService } from './meeting/meeting.service';
import { NgbModule, ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { SharedModule } from '../shared/shared.module';
import { HistoryComponent } from './history/history.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ContactsComponent } from './contacts/contacts.component';

import { from } from 'rxjs';
import { EventSchedulerComponent } from './event-scheduler/event-scheduler.component';

import { ScheduleModule, AgendaService, DayService, WeekService, WorkWeekService, MonthService, DragAndDropService, ResizeService } from '@syncfusion/ej2-angular-schedule';

export const routes = [
  { path: '', component: LeadComponent, pathMatch: 'full', data: { title: 'Manage Lead' } },
  { path: 'add', component: AddEditLeadComponent, data: { title: 'Add' } },
  { path: 'add/:id', component: AddEditLeadComponent, data: { title: 'Edit' } },
  { path: 'task', component: TaskComponent, data: { title: 'Edit' } },
  { path: 'comment', component: CommentComponent, data: { title: 'Edit' } },
  { path: 'meeting', component: MeetingComponent, data: { title: 'Edit' } },
  { path: 'call', component: CallComponent, data: { title: 'Edit' } },
  { path: 'scheduler', component: SchedulerComponent, data: { title: 'scheduler' } }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    UiSwitchModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedModule,
    ScheduleModule,
    MultiSelectModule, DropDownListModule, DateTimePickerModule, RichTextEditorAllModule,
    NumericTextBoxModule, TooltipModule, CheckBoxModule, RadioButtonModule, NgbModule,
    NgMultiSelectDropDownModule
   
  ],
  declarations: [
    LeadComponent,
    AddEditLeadComponent,
    CallComponent,
    CommentComponent,
    TaskComponent,
    MeetingComponent,
    SchedulerComponent,
    HistoryComponent,
    ContactsComponent,
    EventSchedulerComponent,
  ],
  providers: [
    LeadService,
    CallService,
    CommentService,
    TaskService,
    AgendaService, DayService, WeekService, WorkWeekService, MonthService, DragAndDropService, ResizeService,
    MeetingService, ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService,
  ],
  //entryComponents: [AddEditLeadComponent],
  exports: [
    //LoaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeadModule {
  static routes = routes;
}
