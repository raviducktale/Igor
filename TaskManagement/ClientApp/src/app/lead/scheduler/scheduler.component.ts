import { Component, OnInit, Query } from '@angular/core';
import { SchedulerService } from '../scheduler/scheduler.service';
import { CallService } from '../call/call.service';
import { TaskService } from '../task/task.service';
import { MeetingService } from '../meeting/meeting.service';
import { CommentService } from '../comment/comment.service';

import { View, EventSettingsModel } from '@syncfusion/ej2-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, UrlAdaptor, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { CodeNode } from 'source-list-map';
import { Ajax } from '@syncfusion/ej2-base';
import { promise } from 'protractor';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
  providers: [DayService, WeekService, MonthService],
})
export class SchedulerComponent implements OnInit {



  scheduler: any = {
    _id: "",
    id: "",
    Subject: "",
    StartTime: "",
    EndTime: "",
    StartTimezone: "",
    EndTimezone: "",
    Location: "",
    Description: "",
    IsAllDay: false,
    Recurrence: "",
    RecurrenceRule: "",
    Frequency: "",
    Interval: "",
    Count: "",
    IsReadonly: false,
    IsBlock: false,
    Untill: "",
    ByDay: "",
    BYMonthDay: "",
    BYMonth: "",
    BYSetPOS: ""
  }
  public dataManager: any;
  public query;
  public ajax: any;

  actionModel: any;
  ds: any;
  public currentView: View = 'Month';
  public selectedDate: Date = new Date();

  public eventSettings: EventSettingsModel = {
   
    dataSource: this.ds

  };




  //public eventSettings: any

  //public eventSettings: EventSettingsModel = {
  //  dataSource: [
  //    {
  //      Description: "",
  //      EndTime: "2019-04-15T19:00:00.000Z",
  //      EndTimezone: "",
  //      Id: "5cad8af0c44a991de0ba17ec",
  //      IsAllDay: true,
  //      Location: "Delhi",
  //      Recurrence: true,
  //      RecurrenceID: "5cad8af0c44a991de0ba17ec",
  //      RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=5",
  //      StartTime: "2019-04-15T18:30:00.000Z",
  //      StartTimezone: "",
  //      Subject: "Meeting1",

  //    },
  //    {
  //      Description: "",
  //      EndTime: "2019-04-16T19:00:00.000Z",
  //      EndTimezone: "",
  //      Id: "5cad8a72c44a991de0ba17ea",
  //      IsAllDay: false,
  //      Location: "",
  //      Recurrence: true,
  //      RecurrenceID: "5cad8a72c44a991de0ba17ea",
  //      RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=5",
  //      StartTime: "2019-04-16T18:30:00.000Z",
  //      StartTimezone: "",
  //      Subject: "Task123",
  //    }
  //  ]
      
  //};

  constructor(
    protected service: SchedulerService, protected callService: CallService, protected meetingService: MeetingService,
    protected taskService: TaskService,  protected commentService: CommentService
  ) {

    //this.dataManager = new  DataManager({
    //  //OData v4 service 
    //  url: "http://services.odata.org/V4/Northwind/Northwind.svc/Orders/",
    //  adaptor: new ODataV4Adaptor()
    //});
    //this.query = Query().



    //this.ajax = new Ajax('Call', 'GET', false);
    //this.ajax.onSuccess = function (value) {
    //this.dataManager = value;
    //  console.log("value",value)
    // };
    //this.ajax.send();
    
    //this.GetAllCall();
    //this.GetAllMeeting();
    //this.GetAllTask();
    //this.UpdateAppointments();
  }

  
  

  ngOnInit() {
    this.ds = [];

  }

  async GetAllCall() {
   
    await  this.callService.getCall<any>()
    
      .subscribe(data => {
        data.map((x) => {
          this.ds.push({
            Id: x._id,
            Subject: x.subject,
            StartTime: new Date(x.eventStartDate).toISOString(),
            EndTime: new Date(x.eventEndDate).toISOString(),
            IsAllDay: x.isAllDay,
            Recurrence: true,
            RecurrenceID: x._id,
            RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=5',
            Location: x.location,
            Description: x.description,
            StartTimezone: x.startTimezone,
            EndTimezone: x.EndTimezone,
          })
          console.log("ds1", this.ds);
        });
      }, error => {
        console.log("error1",error);
      }, () => { });
  }

  async GetAllMeeting() {
    try {
     await this.meetingService.getMeeting<any>()
        .subscribe(data => {
          data.map((x) => {
            this.ds.push({
              Id: x._id,
              Subject: x.subject,
              StartTime: new Date(x.eventStartDate).toISOString(),
              EndTime: new Date(x.eventEndDate).toISOString(),
              IsAllDay: x.isAllDay,
              Recurrence: true,
              RecurrenceID: x._id,
              RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=5',
              Location: x.location,
              Description: x.description,
              StartTimezone: x.startTimezone,
              EndTimezone: x.EndTimezone,
            })
            console.log("ds2", this.ds);
           
          });
        }, error => {
          console.log("error2", error);
        }, () => { });
    }
    catch (e) {
      console.log(e);
    }
  }

 async GetAllTask() {
    await this.taskService.getTask<any>()
      .subscribe(data => {
        debugger
        data.map((x) => {
          this.ds.push({
            Id: x._id,
            Subject: x.subject,
            StartTime: new Date(x.eventStartDate).toISOString(),
            EndTime: new Date(x.eventEndDate).toISOString(),
            IsAllDay: x.isAllDay,
            Location: x.location,
            Description: x.description,
            StartTimezone: x.startTimezone,
            EndTimezone: x.EndTimezone,
          })
          console.log("ds3", this.ds);
          this.eventSettings.dataSource = this.ds;
          console.log("datasourcenew123", this.eventSettings.dataSource);
        });
      }, error => {
        console.log("error3", error);
     }, () => { });
   return this.ds;
  }

  //async  UpdateAppointments() {
  //  this.GetAllTask().then(this.eventSettings.dataSource = this.ds);
  //  //promise.fullyResolved(this.GetAllTask()).then((response) => { this.eventSettings.dataSource = this.ds })
  //  //debugger

  //  //await this.GetAllTask(); 
  //  //let check = this.ds;
  //  //this.eventSettings.dataSource = check;
  //}




  fnSchedulerModel(): any {
    return {
      _id: "",
      Subject: "",
      Location: "",
      ResponsiblePerson: "",
      Priority: "",
      Types: "",
      CreatedBy: "",
      UpdatedBy: "",
      CreatedDate: "",
      UpdatedDate: "",
      EventStartDate: "",
      EventEndDate: "",
      ReminderNotification: "",
      Completed: false,
      Description: "",
      RepeatTask: 0,
      Interval: "",
      RepeatAfter: "",
      Untill: "",
      UntillDate: "",
      UntillCompile: "",
      RemindUsing: "",
      RemindTo: "",
      RepeatEvery: "",
      RepeatOnWeekDay: "",
      RepeatOnDay: "",
      WillRepeat: "",
      WillRepeatWeekDay: "",
      RepeatOnMonth: ""
    }
  }
  
}







