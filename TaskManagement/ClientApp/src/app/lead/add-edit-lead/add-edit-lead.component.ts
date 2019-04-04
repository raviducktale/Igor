import { Component, OnInit, Query, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallService } from '../call/call.service';
import { MeetingService } from '../meeting/meeting.service';
import { SchedulerService } from '../scheduler/scheduler.service';
import { HistoryService } from '../history/history.service';
import { TaskService } from '../task/task.service';
import { CommentService } from '../comment/comment.service';

import { EventSettingsModel, View, PopupOpenEventArgs, ActionEventArgs,  } from '@syncfusion/ej2-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService  } from '@syncfusion/ej2-angular-richtexteditor';
import { debug } from 'util';

enum ACTIONS {
  Call,
  Meeting,
  Task,
  Comment,
  Email
}

@Component({
  selector: 'app-add-edit-lead',
  templateUrl: './add-edit-lead.component.html',
  styleUrls: ['./add-edit-lead.component.css'],
  providers: [DayService, WeekService, MonthService, ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService ],
})

export class AddEditLeadComponent implements OnInit {
  ACTIONS = ACTIONS;
  selectedAction: any;
  limit = 4;
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
 
  call: any = {
    id: "",
    Subject: "",
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
    Subject: "",
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

  task: any = {
    id: "",
    Subject: "",
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

  actionModel: any = {
    _id: "",
    Subject: "",
    Location: "",
    ResponsiblePerson : "",
    Priority: "",
    Types: "",
    CreatedBy: "",
    UpdatedBy: "",
    CreatedDate: "",
    UpdatedDate: "",
    EventStartDate: "",
    EventEndDate: "",
    ReminderNotification: "",
    Completed: true,
    Description: "",
    RepeatTask: "",
    Interval: "",
    RepeatAfter: "",
    Untill: "",
    UntillDate: "",
    UntillCompile:"",
    RemindUsing: "",
    RemindTo:""

  }

  history: any = {
    id: "",
    Subject: "",
    Action: "",
    Panel: "",
    CreatedBy: "",
    CreatedDate: "",
    Button: "",
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
  untills: { [key: string]: Object }[];
  untillsfields: Object;
  reminds: { [key: string]: Object }[];
  remindsfields: Object;

  callVM: any;
  meetingVM: any;
  taskVM: any;
  actionModelVM: any;
  tabledata: any;
  meetingtabledata: any;
  tasktabledata: any;
  historytabledata: any;
  commenttabledata: any;
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

  constructor(private router: ActivatedRoute,
    protected service: CallService,
    protected meetingService: MeetingService,
    protected schedulerService: SchedulerService,
    protected historyService: HistoryService,
    protected commentService: CommentService,
    protected taskService: TaskService)
  {
   
    //this.GetAllCall();
    //this.GetAllMeeting();
    //this.GetAllTask();
    this.GetAllHistory();
    this.router.params.subscribe(params => { this.selectedId = +params['id']; });
  }

  ngOnInit() {
    this.tabledata = [];
    this.meetingtabledata = [];
    this.ds = [];
    this.tasktabledata = [];
    this.historytabledata = [];
    this.commenttabledata = [];

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
        { repeattaskoptionsName: 'Never', repeattaskoptionsId: 0 },
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

        this.untills = [
        { untillsName: 'No End', untillsId: 1 },
        { untillsName: 'End Date', untillsId: 2 },
        { untillsName: 'Compile After', untillsId: 3 },
        ],
        this.untillsfields = { text: 'untillsName', value: 'untillsId' },

        this.reminds = [
        { remindsName: 'Ashley Aldon', remindsId: 1 },
        { remindsName: 'Mithun Thomas', remindsId: 2 },
        { remindsName: 'David Backom', remindsId: 3 },
        { remindsName: 'Raja Thomas', remindsId: 4 },
        ],
        this.remindsfields = { text: 'remindsName', value: 'remindsId' },
   
      this.leads = [{ id: 1, name: "test1", description: "test sdf test description1", date: "01-01-2019" },
        { id: 2, name: "test2", description: "test test2 sara description2", date: "01-05-2019" },
        { id: 3, name: "test3", description: "test test356 dfytr description3", date: "02-01-2019" },
        { id: 4, name: "test3", description: "test test356 dfytr description3", date: "02-01-2019" },
        { id: 5, name: "test3", description: "test test356 dfytr description3", date: "02-01-2019" },
        { id: 6, name: "test4", description: "test 4444 dfytr description3", date: "03-02-2019" }]

      if (this.selectedId)
      this.selectedLead = this.leads.find(x => x.id == this.selectedId);
      else
      this.selectedLead = { id: 0, name: "", description: "", date: "" }

  }

  selectAction(action) {
    this.selectedAction = action;
  }
  showAll(_limit) {
    this.limit = _limit;
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
  AddCall(actionModel) {
    console.log(actionModel);
    this.service.addCall<any>(actionModel)
      .subscribe(data => {
        this.actionModelVM = data;
        this.GetAllCall();
        this.history.Action = "Call",
          this.history.Subject = actionModel.Subject,
          this.history.Panel = "Lead",
          this.history.CreatedBy = "1",
          this.history.CreatedDate = new Date(),
          this.history.Button = "Added"
        this.AddHistory(this.history);


      }, error => {
      }, () => { });
   
  }

  //Meeting Methods
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
  AddMeeting(actionModel) {
    console.log(actionModel);
    this.meetingService.addMeeting<any>(actionModel)
      .subscribe(data => {
        this.actionModelVM = data;
        console.log(data);
        this.GetAllMeeting();
        this.history.Action = "Meeting",
          this.history.Subject = actionModel.Subject,
          this.history.Panel = "Lead",
          this.history.CreatedBy = "2",
          this.history.CreatedDate = new Date(),
          this.history.Button = "Added"
        this.AddHistory(this.history);
        console.log(data);
      }, error => {
      }, () => { });
  }

  //Task Methods
  GetAllTask() {
    this.tasktabledata = [];
    this.taskService.getTask<any>()
      .subscribe(data => {
        data.map((x) => {
          this.tasktabledata.push({
            Description: x.description,
            Subject: x.taskSubject,
            ResponsiblePerson: x.responsiblePerson,
            RepeatTask: x.repeatTask
          })
        });
        console.log("tasktabledata", this.tasktabledata)
      }, error => {
      }, () => { });
  }
  AddTask(actionModel) {
    this.taskService.addTask<any>(actionModel)
      .subscribe(data => {
        this.actionModelVM = data;
        this.GetAllTask();
        this.history.Action = "Task",
          this.history.Subject = actionModel.Subject,
          this.history.Panel = "Lead",
          this.history.CreatedBy = "3",
          this.history.CreatedDate = new Date(),
          this.history.Button = "Added"
        this.AddHistory(this.history);
        console.log(data);
      }, error => {
      }, () => { });
  }

  GetAllComment() {
    this.commenttabledata = [];
    this.commentService.getComment<any>()
      .subscribe(data => {
        data.map((x) => {
          this.commenttabledata.push({
            Description: x.description,
            Subject: x.taskSubject,
            ResponsiblePerson: x.responsiblePerson,
            RepeatTask: x.repeatTask
          })
        });
        console.log("commenttabledata", this.commenttabledata)
      }, error => {
      }, () => { });
  }


  AddComment(actionModel) {
    this.commentService.addComment<any>(actionModel)
      .subscribe(data => {
        this.actionModelVM = data;
        this.GetAllComment();
        this.history.Action = "Comment",
          this.history.Subject = actionModel.Subject,
          this.history.Panel = "Lead",
          this.history.CreatedBy = "4",
          this.history.CreatedDate = new Date(),
          this.history.Button = "Added"
        this.AddHistory(this.history);
        console.log(data);
      }, error => {
      }, () => { });
  }

  //History Methods
  GetAllHistory() {
    this.historytabledata = [];
    this.historyService.getHistory<any>()
      .subscribe(data => {
        data.map((x) => {
          this.historytabledata.push({
            Action: x.action,
            Panel: x.panel,
            Subject:x.subject,
            CreatedBy: x.createdBy,
            CreatedDate: new Date(x.createdDate).toDateString(),
            Button:x.button
          })
        });
        console.log("historytabledata", this.historytabledata)
      }, error => {
      }, () => { });
  }

  AddHistory(history) {
    console.log(history);
    this.historyService.addHistory<any>(history)
      .subscribe(data => {
        this.GetAllHistory();
        console.log(data);
      }, error => {
      }, () => { });
  }
  }

