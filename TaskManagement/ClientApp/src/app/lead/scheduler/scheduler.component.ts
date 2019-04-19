import { Component, OnInit, Query } from '@angular/core';
import { SchedulerService } from '../scheduler/scheduler.service';
import { CallService } from '../call/call.service';
import { TaskService } from '../task/task.service';
import { MeetingService } from '../meeting/meeting.service';
import { CommentService } from '../comment/comment.service';
import { View, EventSettingsModel } from '@syncfusion/ej2-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, UrlAdaptor, ODataV4Adaptor, WebApiAdaptor, WebMethodAdaptor, JsonAdaptor } from '@syncfusion/ej2-data';
import { CodeNode } from 'source-list-map';
import { Ajax } from '@syncfusion/ej2-base';
import { promise } from 'protractor';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
  providers: [DayService, WeekService, MonthService],
})
export class SchedulerComponent  {
  public selectedDate: Date;
  public currentDate: Date;
  public currentView: View;
  private dataManager: DataManager;
  public eventSettings: EventSettingsModel;
  constructor() {
    console.log("today", new Date());
    this.getResults();
  }

  async getResults() {
   // let expectedResults = await this.UpdateScheduler();
   // let setResults = await this.setValues();
   // console.log("expectedResults", expectedResults);
    //console.log("setResults", setResults);

    this.selectedDate = new Date();
    this.currentView = 'Month';
    this.dataManager = new DataManager({
      url: 'https://localhost:44369/api/Scheduler/GetCalls', //GetCalls',
      //adaptor: new WebApiAdaptor,
      crossDomain: true
    });
    this.eventSettings = { dataSource: this.dataManager };

  }

  onActionFailure(): void {
    alert('Server exception: 404 Not found');
  }


  //new check code
  async UpdateScheduler() {
    debugger
    this.selectedDate = new Date();
    this.currentView = 'Month';
    this.dataManager = new DataManager({
      url: 'https://localhost:44369/api/Scheduler/GetCalls', //GetCalls',
      //adaptor: new WebApiAdaptor,
      crossDomain: true
    });
    console.log("dataManagerValue---", this.dataManager);
    this.eventSettings = { dataSource: this.dataManager };
  }

  async setValues() {
    debugger
    console.log("dataManagerValue", this.dataManager);
    this.eventSettings = { dataSource: this.dataManager };
  }

}






