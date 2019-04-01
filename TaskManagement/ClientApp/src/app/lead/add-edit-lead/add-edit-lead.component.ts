import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallService } from '../call/call.service';
import { SchedulerService } from '../scheduler/scheduler.service';
import { EventSettingsModel, View } from '@syncfusion/ej2-schedule';
import { DataManager, ODataV4Adaptor, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-add-edit-lead',
  templateUrl: './add-edit-lead.component.html',
  styleUrls: ['./add-edit-lead.component.css'],
  providers: [DayService, WeekService, MonthService]
})

export class AddEditLeadComponent implements OnInit {

  //Call
  call: any = {
    id: "",
    CallId: "",
    CallSubject: "",
    ResponsiblePerson: "",
    Priority: -1,
    Type: -1,
    CreatedBy: "",
    UpdatedBy: "",
    CreatedDate: "",
    UpdatedDate: "",
    EventStartDate: "",
    EventEndDate: "",
    RepeatTask: -1,
    ReminderNotification: "",
    Completed: true,
    Description: ""
  }
  leads: any;
  selectedLead: any;
  selectedId: number;
  priorities: any;
  types: any;
  repeattaskoptions: any;
  completes: any;  
  callVM: any;

  //Scheduler
  scheduler: any = {
    _id: "",
    Id:"",
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

  ds: any = {
    Id: "",
    Subject: "",
    StartTime: "",
    EndTime: "",
    StartTimezone: "",
    EndTimezone: "",
    Location: "",
    Description: "",
    IsAllDay: false    
  }
  schedulerList: any;
  currentView:'Month'
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel = {
    dataSource: [{}]
      //{
        //  //Id: 1,
        //  //Subject: 'Explosion of Betelgeuse Star',
        //  //StartTime: new Date(2019, 4, 4, 9, 30),
        //  //EndTime: new Date(2019, 4, 4, 11, 0),
        //  //Location: 'Bilaspur',
        //  //IsAllDay: true,
        //  //Description: 'jkakfdafjkfdjkfjkfdfjkda skdjaslkadas',
        //  //RecurrenceID:3,
        //  //RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=8'
        //  //Frequency:
        //  //  Interval:
        //  //Untill:
        //  //  Count:
        //  //ByDay:
        //  //  BYMonthDay:
        //  //BYMonth:
        //  //  BYSetPOS:

        // // FREQ=NEVER,MONTHLY, YEARLY, WEEKLY, DAILY
        ////BYDAY=MO; BYSETPOS=2; COUNT=10,UNTIL=20180530T041343Z;
        // //BYMONTHDAY=16; BYMONTH=6; INTERVAL=1; COUNT=10

        //},
        //{
        //  Id: 2,
        //  Subject: 'Thule Air Crash Report',
        //  StartTime: new Date(2019, 4, 4, 12, 0),
        //  EndTime: new Date(2019, 4, 4, 14, 0),
        //  Location: 'Bilaspur2',
        //  IsAllDay: false,
        //  Description: 'fffffffffffffffffffffffff',
        //},
        //{
        //  Id: 3,
        //  Subject: 'Blue Moon Eclipse',
        //  StartTime: new Date(2019, 4, 4, 9, 30),
        //  EndTime: new Date(2019, 4, 4, 11, 0),
        //  Location: 'Bilaspur3',
        //  IsAllDay: true,
        //  Description: 'qqqqqqqqqqqqqqqqqqqqqqqqqq',
        //},
        //{
        //  Id: 4,
        //  Subject: 'Meteor Showers in 2019',
        //  StartTime: new Date(2019, 4, 14, 13, 0),
        //  EndTime: new Date(2019, 4, 15, 14, 30),
        //  Location: 'Bilaspur4',
        //  IsAllDay: true,
        //  Description: 'uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu',
        //}]


      }

  constructor(private router: ActivatedRoute, protected service: CallService, protected schedulerService: SchedulerService) {
    this.GetAllScheduler();
    //this.AddScheduler(this.scheduler);
    this.router.params.subscribe(params => { this.selectedId = +params['id']; });
  }

  ngOnInit() {
    this.ds = [];
    this.priorities = [{ name: "High", value: 1 },
    { name: "Medium", value: 2 },
    { name: "Low", value: 3 }]
    this.types = [{ name: "Inbound", value: 1 },
    { name: "Outbound", value: 2 }]
    this.repeattaskoptions = [{ name: "Day", value: 1 },
    { name: "Week", value: 2 },
    { name: "Month", value: 3 },
    { name: "Year", value: 4 }]
    this.completes = [{ name: "Yes", value: true },
    { name: "No", value: false }]
    this.leads = [{ id: 1, name: "test1", description: "test sdf test description1", date: "01-01-2019" },
    { id: 2, name: "test2", description: "test test2 sara description2", date: "01-05-2019" },
    { id: 3, name: "test3", description: "test test356 dfytr description3", date: "02-01-2019" },
    { id: 4, name: "test4", description: "test 4444 dfytr description3", date: "03-02-2019" }]

    if (this.selectedId)
      this.selectedLead = this.leads.find(x => x.id == this.selectedId);
    else
      this.selectedLead = { id: 0, name: "", description: "", date: "" }

  }

  //Calls Methods
  GetAllCall() {
    this.service.getCall<any>()
      .subscribe(data => {
        //this.callList = data;
        //console.log(this.data);
      }, error => {
      }, () => { });
  }
  AddCall(call) {
    console.log(call);
    this.service.addCall<any>(call)
      .subscribe(data => {
        this.callVM = data;
        console.log(data);
      }, error => {
      }, () => { });
  }
  EditCall(call) {
    alert(call);

  }
  UpdateCall(call) {
    alert(call);
    this.service.updateCall<any>(call)
      .subscribe(data => {
        this.GetAllCall();
        console.log(data);
      }, error => {
      }, () => { });
  }
  DeleteCall(id) {
    alert(id);
    this.service.deleteCall<any>(id)
      .subscribe(data => {
        this.GetAllCall();
        console.log(data);
      }, error => {
      }, () => { });
  }


  //Scheduler Methods
  GetAllScheduler() {
    this.schedulerService.getScheduler<any>()
      .subscribe(data => {
        this.schedulerList = data;
        this.ds = [];
        debugger
        data.map((x, i) => {
          this.ds.push({
            Subject: x.subject,
            StartTime: x.startTime,
          })
          //this.ds[i].Subject = x.subject,      
          //this.ds[i].StartTime = x.startTime,   
          //this.ds[i].EndTime = x.endTime ,      
          //this.ds[i].StartTimezone = x.startTimezone,
          //this.ds[i].EndTimezone= x.endTimezone, 
          //this.ds[i].Location = x.location,  
          //this.ds[i].Description= x.description, 
          //this.ds[i].IsAllDay =  false
        });
    this.eventSettings.dataSource = this.ds;
        console.log(this.schedulerList);
      }, error => {
      }, () => { });
  }


  AddScheduler(scheduler) {
    console.log(scheduler);
    this.schedulerService.addScheduler<any>(scheduler)
      .subscribe(data => {
        this.GetAllScheduler();
        console.log(data);
      }, error => {
      }, () => { });
  }

  UpdateScheduler(scheduler) {
    alert(scheduler);
    this.schedulerService.updateScheduler<any>(scheduler)
      .subscribe(data => {
        this.GetAllScheduler();
        console.log(data);
      }, error => {
      }, () => { });
  }
  DeleteScheduler(id) {
    alert(id);
    this.schedulerService.deleteScheduler<any>(id)
      .subscribe(data => {
        this.GetAllScheduler();
        console.log(data);
      }, error => {
      }, () => { });
  }

}
