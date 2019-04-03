import { Component, OnInit, Query, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallService } from '../call/call.service';
import { MeetingService } from '../meeting/meeting.service';
import { SchedulerService } from '../scheduler/scheduler.service';
import { EventSettingsModel, View, PopupOpenEventArgs, ActionEventArgs,  } from '@syncfusion/ej2-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService  } from '@syncfusion/ej2-angular-richtexteditor';
import { debug } from 'util';

@Component({
  selector: 'app-add-edit-lead',
  templateUrl: './add-edit-lead.component.html',
  styleUrls: ['./add-edit-lead.component.css'],
  providers: [DayService, WeekService, MonthService, ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService ],
})

export class AddEditLeadComponent implements OnInit {

  public value: string = '';
  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };
  public quickTools: object = {
    image: [
      'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '-', 'Display', 'AltText', 'Dimension']
  };

  public value2: string = '';
  public tools2: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };
  public quickTools2: object = {
    image: [
      'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '-', 'Display', 'AltText', 'Dimension']
  };

  public iframe: object = { enable: true };
  public height: number = 500;
  
  //Call
  call: any = {
    id: "",
    CallId: "",
    CallSubject: "",
    ResponsiblePerson: "",
    Priority: "",
    Type: "",
    CreatedBy: "",
    UpdatedBy: "",
    CreatedDate: "",
    UpdatedDate: "",
    EventStartDate: "",
    EventEndDate: "",
    RepeatTask: "",
    ReminderNotification: "",
    Completed: true,
    Description: ""
  }

  meeting: any = {
    id: "",
    MeetingId: "",
    MeetingSubject: "",
    Location:"",
    ResponsiblePerson: "",
    Priority: "",
    CreatedBy: "",
    UpdatedBy: "",
    CreatedDate: "",
    UpdatedDate: "",
    EventStartDate: "",
    EventEndDate: "",
    RepeatTask: "",
    ReminderNotification: "",
    Completed: true,
    Description: ""
  }

  leads: any;
  selectedLead: any;
  selectedId: number;
  ResponsiblePersondata: Object[];
  ResponsiblePersonfields: Object;
  priorities: { [key: string]: Object }[];
  prioritiesfields: Object;
  types: { [key: string]: Object }[];
  typesfields: Object;
  completes: { [key: string]: Object }[];
  completesfields: Object;
  repeattaskoptions: { [key: string]: Object }[];
  repeattaskoptionsfields: Object;
  callVM: any;
  meetingVM: any;
  tabledata: any;
  meetingtabledata: any;
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
  ds: any;
  public currentView: View = 'Month';
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel = {
    dataSource: [{
      Description: "Description1",
      EndTime: "2019-04-03T22:00:00.000Z",
      EndTimezone: "",
      Id: 1,
      IsAllDay: false,
      Location: "",
      StartTime: "2019-04-03T18:30:00.000Z",
      StartTimezone: "",
      Subject: "subject1",
    },
      {
        Description: "Description2",
        EndTime: "2019-04-07T22:00:00.000Z",
        EndTimezone: "",
        Id: 2,
        IsAllDay: false,
        Location: "",
        StartTime: "2019-04-07T18:30:00.000Z",
        StartTimezone: "",
        Subject: "subject2",
      },
    ]
  };

  constructor(private router: ActivatedRoute, protected service: CallService, protected meetingService: MeetingService, protected schedulerService: SchedulerService) {
    this.GetAllScheduler();
    this.GetAllCall();
    this.GetAllMeeting();
    this.router.params.subscribe(params => { this.selectedId = +params['id']; });
  }

  ngOnInit() {
    this.tabledata = [];
    this.meetingtabledata = [];
  this.ds = [];
    this.ResponsiblePersondata = [
      { id: 'Game1', sports: 'Asley Thomas' },
      { id: 'Game2', sports: 'Mithun' },
      { id: 'Game3', sports: 'Abhiram Thomas' },
      { id: 'Game4', sports: 'Sanjeev Kumar' },
      { id: 'Game5', sports: 'Baljeet' }
    ],
      this.ResponsiblePersonfields = { text: 'sports', value: 'sports' },

      this.priorities = [
      { prioritiesName: 'High', prioritiesId: 1  },
      { prioritiesName: 'Medium', prioritiesId: 2  },
      { prioritiesName: 'Low',  prioritiesId: 3 },
      ],
      this.prioritiesfields = { text: 'prioritiesName', value: 'prioritiesId' },

      this.types = [
      { typesName: 'Inbound',  typesId: 1 },
      { typesName: 'Outbound', typesId: 2 },
      ],
      this.typesfields = { text: 'typesName', value: 'typesId' },


      this.repeattaskoptions = [
      { repeattaskoptionsName: 'Day',  repeattaskoptionsId: 1  },
      { repeattaskoptionsName: 'Week', repeattaskoptionsId: 2  },
      { repeattaskoptionsName: 'Month', repeattaskoptionsId: 3  },
      { repeattaskoptionsName: 'Year', repeattaskoptionsId: 4  },
      ],
      this.repeattaskoptionsfields = { text: 'repeattaskoptionsName', value: 'repeattaskoptionsId' },


      this.completes = [
      { completesName: 'Yes',  completesId: true  },
      { completesName: 'No',  completesId: false },
      ],
      this.completesfields = { text: 'completesName', value: 'completesId' },
   
    this.leads = [{ id: 1, name: "test1", description: "test sdf test description1", date: "01-01-2019" },
    { id: 2, name: "test2", description: "test test2 sara description2", date: "01-05-2019" },
    { id: 3, name: "test3", description: "test test356 dfytr description3", date: "02-01-2019" },
    { id: 4, name: "test4", description: "test 4444 dfytr description3", date: "03-02-2019" }]
    if (this.selectedId)
      this.selectedLead = this.leads.find(x => x.id == this.selectedId);
    else
      this.selectedLead = { id: 0, name: "", description: "", date: "" }

  }

 


  //Scheduler Methods
   GetAllScheduler() {
    this.ds = [];
     this.schedulerService.getScheduler<any>()
    .subscribe(data => {
      data.map((x) => {

        this.ds.push({
          Description: x.description,
          EndTime: new Date(x.endTime).toISOString(),
          EndTimezone: x.endTimezone,
          Id: x.id,
          IsAllDay: x.isAllDay,
          Location: x.location,
          StartTime: new Date(x.startTime).toISOString(),
          Subject: x.subject,
          StartTimezone: x.startTimezone,
        })
        this.eventSettings.dataSource = this.ds;
        console.log("dataSource", this.ds);
      });
       
        
      }, error => {
      }, () => { });
    console.log("ds", this.ds)
    return this.ds;
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

  //Calls Methods
  GetAllCall() {
    this.tabledata = [];
    this.service.getCall<any>()
      .subscribe(data => {
        data.map((x) => {
          this.tabledata.push({
            Description: x.description,
            Subject: x.callSubject,
            ResponsiblePerson: x.responsiblePerson,
            RepeatTask: x.repeatTask
          })
        
        });
        console.log("tabledata", this.tabledata)
      }, error => {
      }, () => { });
  }

  AddCall(call) {
    console.log(call);
    this.service.addCall<any>(call)
      .subscribe(data => {
        this.callVM = data;
        console.log(data);
        this.GetAllCall();
      }, error => {
      }, () => { });
   
  }

  GetAllMeeting() {
    this.meetingtabledata = [];
    this.meetingService.getMeeting<any>()
      .subscribe(data => {
        data.map((x) => {
          this.meetingtabledata.push({
            Description: x.description,
            Subject: x.meetingSubject,
            ResponsiblePerson: x.responsiblePerson,
            RepeatTask: x.repeatTask
          })

        });
        console.log("meetingtabledata", this.meetingtabledata)
      }, error => {
      }, () => { });
  }
  AddMeeting(meeting) {
    console.log(meeting);

    this.meetingService.addMeeting<any>(meeting)
      .subscribe(data => {
        this.meetingVM = data;
        this.GetAllMeeting();
        console.log(data);
      }, error => {
      }, () => { });
  }
}
