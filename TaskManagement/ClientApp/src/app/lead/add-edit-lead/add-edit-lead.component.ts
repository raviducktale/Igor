import { Component, OnInit, Query, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CallService } from '../call/call.service';
import { MeetingService } from '../meeting/meeting.service';
import { HistoryService } from '../history/history.service';
import { TaskService } from '../task/task.service';
import { CommentService } from '../comment/comment.service';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService  } from '@syncfusion/ej2-angular-richtexteditor';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService],
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
    Location: "",
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
  actionModel: any = this.fnActionModel();
  history: any = {
    id: "",
    Subject: "",
    Action: "",
    ActionId: "",
    Panel: "",
    Completed:"",
    CreatedBy: "",
    CreatedDate: "",
    Button: "",
  }

  leads: any;
  selectedLead: any;
  selectedId: number;

  ButtonEvent: string = 'Save';
  Editedhistoryid: string;
  historyBox: string="";
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
  repeatOnWeekDays: { [key: string]: Object }[];
  repeatOnWeekfields: Object;
  willRepeats: { [key: string]: Object }[];
  willRepeatsfields: Object;
  willRepeatOnWeekDays: { [key: string]: Object }[];
  willRepeatOnWeekDaysfields: Object;
  repeatonmonths: { [key: string]: Object }[];
  repeatonmonthsfields: Object;

  callVM: any;
  meetingVM: any;
  taskVM: any;
  actionModelVM: any;
  tabledata: any;
  meetingtabledata: any;
  tasktabledata: any;
  historytabledata: any;
  commenttabledata: any;

  callActive = false;
  meetingActive = false;
  taskActive = false;
  commentActive = false;
  closeResult: string;

  constructor(private router: ActivatedRoute,
    protected callService: CallService,
    protected meetingService: MeetingService,
    protected historyService: HistoryService, 
    protected taskService: TaskService,
    protected commentService: CommentService,
    private modalService: NgbModal
  ) {
    this.GetAllHistory();
    this.router.params.subscribe(params => { this.selectedId = +params['id']; });
  }
  

  ngOnInit() {
    this.tabledata = [];
    this.meetingtabledata = [];
    this.tasktabledata = [];
    this.historytabledata = [];
    this.commenttabledata = [];

    this.ResponsiblePersondata = [
      { id: '1', sports: 'Asley Thomas' },
      { id: '2', sports: 'Mithun' },
      { id: '3', sports: 'Abhiram Thomas' },
      { id: '4', sports: 'Sanjeev Kumar' },
      { id: '5', sports: 'Baljeet' }
    ],
      this.ResponsiblePersonfields = { text: 'sports', value: 'id' },
      this.priorities = [
        { prioritiesName: 'High', prioritiesId: 1 },
        { prioritiesName: 'Medium', prioritiesId: 2 },
        { prioritiesName: 'Low', prioritiesId: 3 },
      ],
      this.prioritiesfields = { text: 'prioritiesName', value: 'prioritiesId' },
      this.types = [
        { typesName: 'Inbound', typesId: 1 },
        { typesName: 'Outbound', typesId: 2 },
      ],
      this.typesfields = { text: 'typesName', value: 'typesId' },
      this.repeattaskoptions = [
        { repeattaskoptionsName: 'Never', repeattaskoptionsId: 'NEVER' },
        { repeattaskoptionsName: 'Daily', repeattaskoptionsId: 'DAILY' },
        { repeattaskoptionsName: 'Weekly', repeattaskoptionsId: 'WEEKLY' },
        { repeattaskoptionsName: 'Monthly', repeattaskoptionsId: 'MONTHLY' },
        { repeattaskoptionsName: 'Yearly', repeattaskoptionsId: 'YEARLY' },
      ],
      this.repeattaskoptionsfields = { text: 'repeattaskoptionsName', value: 'repeattaskoptionsId' },
      this.completes = [
        { completesName: 'Yes', completesId: true },
        { completesName: 'No', completesId: false },
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

      this.repeatOnWeekDays = [
        { repeatOnWeekDaysName: 'Sunday', repeatOnWeekDaysId: 'SU' },
        { repeatOnWeekDaysName: 'Monday', repeatOnWeekDaysId: 'MO' },
        { repeatOnWeekDaysName: 'Tuesday', repeatOnWeekDaysId: 'TU' },
        { repeatOnWeekDaysName: 'Wednesday', repeatOnWeekDaysId: 'WE' },
        { repeatOnWeekDaysName: 'Thursday', repeatOnWeekDaysId: 'TH' },
        { repeatOnWeekDaysName: 'Friday', repeatOnWeekDaysId:   'FR' },
        { repeatOnWeekDaysName: 'Saturday', repeatOnWeekDaysId: 'SA' },
      ],
      this.repeatOnWeekfields = { text: 'repeatOnWeekDaysName', value: 'repeatOnWeekDaysId' },
      this.willRepeats = [
        { willRepeatsName: 'First', willRepeatsId: 1 },
        { willRepeatsName: 'Second', willRepeatsId: 2 },
        { willRepeatsName: 'Third', willRepeatsId: 3 },
        { willRepeatsName: 'Forth', willRepeatsId: 4 },
        { willRepeatsName: 'Last', willRepeatsId: 5 },
      ],
      this.willRepeatsfields = { text: 'willRepeatsName', value: 'willRepeatsId' },
      this.willRepeatOnWeekDays = [
        { willRepeatOnWeekDaysName: 'Sunday', willRepeatOnWeekDaysId: 1 },
        { willRepeatOnWeekDaysName: 'Monday', willRepeatOnWeekDaysId: 2 },
        { willRepeatOnWeekDaysName: 'Tuesday', willRepeatOnWeekDaysId: 3 },
        { willRepeatOnWeekDaysName: 'Wednesday', willRepeatOnWeekDaysId: 4 },
        { willRepeatOnWeekDaysName: 'Thursday', willRepeatOnWeekDaysId: 5 },
        { willRepeatOnWeekDaysName: 'Friday', willRepeatOnWeekDaysId: 6 },
        { willRepeatOnWeekDaysName: 'Saturday', willRepeatOnWeekDaysId: 7 },

      ],
      this.willRepeatOnWeekDaysfields = { text: 'willRepeatOnWeekDaysName', value: 'willRepeatOnWeekDaysId' },
      this.repeatonmonths = [
        { repeatonmonthsName: 'January', repeatonmonthsId: 1 },
        { repeatonmonthsName: 'February', repeatonmonthsId: 2 },
        { repeatonmonthsName: 'March', repeatonmonthsId: 3 },
        { repeatonmonthsName: 'April', repeatonmonthsId: 4 },
        { repeatonmonthsName: 'May', repeatonmonthsId: 5 },
        { repeatonmonthsName: 'June', repeatonmonthsId: 6 },
        { repeatonmonthsName: 'July', repeatonmonthsId: 7 },
        { repeatonmonthsName: 'August', repeatonmonthsId: 8 },
        { repeatonmonthsName: 'September', repeatonmonthsId: 9 },
        { repeatonmonthsName: 'October', repeatonmonthsId: 10 },
        { repeatonmonthsName: 'November', repeatonmonthsId: 11 },
        { repeatonmonthsName: 'December', repeatonmonthsId: 12 },

      ],
      this.repeatonmonthsfields = { text: 'repeatonmonthsName', value: 'repeatonmonthsId' },

      this.leads = [{ id: 1, name: "test1", description: "test sdf test description1", date: "01-01-2019" },
      { id: 2, name: "test2", description: "test test2 sara description2", date: "01-05-2019" },
      { id: 3, name: "test3", description: "test test356 dfytr description3", date: "02-01-2019" },
      { id: 4, name: "test3", description: "test test356 dfytr description3", date: "02-01-2019" },
      { id: 5, name: "test3", description: "test test356 dfytr description3", date: "02-01-2019" },
      { id: 6, name: "test4", description: "test 4444 dfytr description3", date: "03-02-2019" }]

    if (this.selectedId) {
      this.selectedLead = this.leads.find(x => x.id == this.selectedId);
    }
    else {
      this.selectedLead = { id: 0, name: "", description: "", date: "" }
    }
  }

  selectAction(action) {
    debugger
    this.selectedAction = action;
    this.actionModel = this.fnActionModel();
    this.ButtonEvent = 'Save';
  }

  showAll(_limit) {
    this.limit = _limit;
  }

  openReminderOption() {
    if (this.actionModel.ShowReminder == true) {
      this.actionModel.ShowReminder = false;
    }
    else {
      this.actionModel.ShowReminder = true;
    }

  }

  SetEndDate(actionModel) {
    actionModel.EventEndDate = actionModel.EventStartDate;
    let newDate = new Date(actionModel.EventEndDate);
    newDate.setMinutes(newDate.getMinutes() + 30);
    actionModel.EventEndDate = newDate;
  }
 
  updateComplete(historyData, event) {
    
    let actionid = historyData.ActionId;
    let action = historyData.Action;
    let historyid = historyData._id;
    let completedata = event.target.checked;
    
    if (action == "Call") {
      let call = this.fnActionModel();
      this.callService.getCallById<any>(actionid)
        .subscribe(data => {
          call._id = data._id,
            call.ResponsiblePerson = data.responsiblePerson,
            call.Subject = data.subject,
            call.Priority = data.priority,
            call.Types = data.types,
            call.CreatedBy = data.createdBy,
            call.UpdatedBy = data.updatedBy,
            call.CreatedDate = data.createdDate,
            call.UpdatedDate = data.updatedDate,
            call.EventStartDate = data.eventStartDate,
            call.EventEndDate = data.eventEndDate,
            call.ReminderNotification = data.reminderNotification,
            call.RepeatTask = data.repeatTask,
            call.Completed = completedata,
            call.Description = data.description,
            call.Interval = data.interval,
            call.RepeatAfter = data.repeatAfter,
            call.Untill = data.untill,
            call.UntillDate = data.untillDate,
            call.UntillCompile = data.untillCompile,
            call.RemindUsing = data.remindUsing,
            call.RemindTo = data.remindTo,
            call.RepeatEvery = data.repeatEvery,
            call.RepeatOnWeekDay = data.repeatOnWeekDay,
            call.RepeatOnDay = data.repeatOnDay,
            call.WillRepeat = data.willRepeat,
            call.WillRepeatWeekDay = data.willRepeatWeekDay,
            call.RepeatOnMonth = data.repeatOnMonth,
            call.IsAllDay = data.isAllDay,
            call.StartTimeZone = data.startTimeZone,
            call.EndTimeZone = data.endTimeZone,
            call.ShowReminder = data.showReminder,
            call.ReminderDate = data.reminderDate,
            call.ReminderPerson = data.reminderPerson

          this.Editedhistoryid = historyid;
          this.UpdateCall(call);
        }, error => {
        }, () => { });
    }
    else if (action == "Meeting") {
      let meeting = this.fnActionModel();
      this.meetingService.getMeetingById<any>(actionid)
        .subscribe(data => {
            meeting._id = data._id,
            meeting.ResponsiblePerson = data.responsiblePerson,
            meeting.Subject = data.subject,
            meeting.Priority = data.priority,
            meeting.Location = data.location,
            meeting.CreatedBy = data.createdBy,
            meeting.UpdatedBy = data.updatedBy,
            meeting.CreatedDate = data.createdDate,
            meeting.UpdatedDate = data.updatedDate,
            meeting.EventStartDate = data.eventStartDate,
            meeting.EventEndDate = data.eventEndDate,
            meeting.ReminderNotification = data.reminderNotification,
            meeting.RepeatTask = data.repeatTask,
            meeting.Completed = completedata,
            meeting.Description = data.description,
            meeting.Interval = data.interval,
            meeting.RepeatAfter = data.repeatAfter,
            meeting.Untill = data.untill,
            meeting.UntillDate = data.untillDate,
            meeting.UntillCompile = data.untillCompile,
            meeting.RemindUsing = data.remindUsing,
            meeting.RemindTo = data.remindTo,
            meeting.RepeatEvery = data.repeatEvery,
            meeting.RepeatOnWeekDay = data.repeatOnWeekDay,
            meeting.RepeatOnDay = data.repeatOnDay,
            meeting.WillRepeat = data.willRepeat,
            meeting.WillRepeatWeekDay = data.willRepeatWeekDay,
            meeting.RepeatOnMonth = data.repeatOnMonth,
            meeting.IsAllDay = data.isAllDay,
            meeting.StartTimeZone = data.startTimeZone,
              meeting.EndTimeZone = data.endTimeZone,
              meeting.ShowReminder = data.showReminder,
              meeting.ReminderDate = data.reminderDate,
              meeting.ReminderPerson = data.reminderPerson
          this.Editedhistoryid = historyid;
          this.UpdateMeeting(meeting);
        }, error => {
        }, () => { });
    }
    else if (action == "Task") {
      let task = this.fnActionModel();
      this.taskService.getTaskById<any>(actionid)
        .subscribe(data => {
          task._id = data._id,
            task.ResponsiblePerson = data.responsiblePerson,
            task.Subject = data.subject,
            task.Priority = data.priority,
            task.Types = data.types,
            task.CreatedBy = data.createdBy,
            task.UpdatedBy = data.updatedBy,
            task.CreatedDate = data.createdDate,
            task.UpdatedDate = data.updatedDate,
            task.EventStartDate = data.eventStartDate,
            task.EventEndDate = data.eventEndDate,
            task.ReminderNotification = data.reminderNotification,
            task.RepeatTask = data.repeatTask,
            task.Completed = completedata,
            task.Description = data.description,
            task.Interval = data.interval,
            task.RepeatAfter = data.repeatAfter,
            task.Untill = data.untill,
            task.UntillDate = data.untillDate,
            task.UntillCompile = data.untillCompile,
            task.RemindUsing = data.remindUsing,
            task.RemindTo = data.remindTo,
            task.RepeatEvery = data.repeatEvery,
            task.RepeatOnWeekDay = data.repeatOnWeekDay,
            task.RepeatOnDay = data.repeatOnDay,
            task.WillRepeat = data.willRepeat,
            task.WillRepeatWeekDay = data.willRepeatWeekDay,
            task.RepeatOnMonth = data.repeatOnMonth,
            task.IsAllDay = data.isAllDay,
            task.StartTimeZone = data.startTimeZone,
            task.EndTimeZone = data.endTimeZone,
            task.ShowReminder = data.showReminder,
            task.ReminderDate = data.reminderDate,
            task.ReminderPerson = data.reminderPerson
          this.Editedhistoryid = historyid;
          this.UpdateTask(task);
        }, error => {
        }, () => { });
    }
    else {
      let comment = this.fnActionModel();
      this.commentService.getCommentById<any>(actionid)
        .subscribe(data => {
            comment._id = data._id,
            comment.ResponsiblePerson = data.responsiblePerson,
            comment.Subject = data.subject,
            comment.CreatedBy = data.createdBy,
            comment.UpdatedBy = data.updatedBy,
            comment.CreatedDate = data.createdDate,
            comment.UpdatedDate = data.updatedDate,
            comment.Completed = completedata

          this.Editedhistoryid = historyid;
          this.UpdateComment(comment);
        }, error => {
        }, () => { });
    }

  }

  EditAction(id, Action, historyid) {
    this.Editedhistoryid = historyid;
    this.ButtonEvent = 'Update';
    this.historyBox = Action;
    this.actionModel= this.fnActionModel();
    if (Action == "Call") {
      this.callService.getCallById<any>(id)
        .subscribe(data => {
          this.actionModel._id = data._id,
            this.actionModel.ResponsiblePerson = data.responsiblePerson,
            this.actionModel.Subject = data.subject,
            this.actionModel.Priority = data.priority,
            this.actionModel.Types = data.types,
            this.actionModel.CreatedBy = data.createdBy,
            this.actionModel.UpdatedBy = data.updatedBy,
            this.actionModel.CreatedDate = data.createdDate,
            this.actionModel.UpdatedDate = data.updatedDate,
            this.actionModel.EventStartDate = data.eventStartDate,
            this.actionModel.EventEndDate = data.eventEndDate,
            this.actionModel.ReminderNotification = data.reminderNotification,
            this.actionModel.RepeatTask = data.repeatTask,
            this.actionModel.Completed = data.completed,
            this.actionModel.Description = data.description,
            this.actionModel.Interval = data.interval,
            this.actionModel.RepeatAfter = data.repeatAfter,
            this.actionModel.Untill = data.untill,
            this.actionModel.UntillDate = data.untillDate,
            this.actionModel.UntillCompile = data.untillCompile,
            this.actionModel.RemindUsing = data.remindUsing,
            this.actionModel.RemindTo = data.remindTo,
            this.actionModel.RepeatEvery = data.repeatEvery,
            this.actionModel.RepeatOnWeekDay = data.repeatOnWeekDay,
            this.actionModel.RepeatOnDay = data.repeatOnDay,
            this.actionModel.WillRepeat = data.willRepeat,
            this.actionModel.WillRepeatWeekDay = data.willRepeatWeekDay,
            this.actionModel.RepeatOnMonth = data.repeatOnMonth,
            this.actionModel.IsAllDay = data.isAllDay,
            this.actionModel.StartTimeZone = data.startTimeZone,
            this.actionModel.EndTimeZone = data.endTimeZone,
          this.actionModel.ShowReminder = data.showReminder,
            this.actionModel.ReminderDate = data.reminderDate,
            this.actionModel.ReminderPerson = data.reminderPerson
        }, error => {
        }, () => { });


    }

    else if (Action == "Meeting") {
      this.meetingService.getMeetingById<any>(id)
        .subscribe(data => {
          this.actionModel._id = data._id,
            this.actionModel.ResponsiblePerson = data.responsiblePerson,
            this.actionModel.Subject = data.subject,
            this.actionModel.Priority = data.priority,
            this.actionModel.Location = data.location,
            this.actionModel.CreatedBy = data.createdBy,
            this.actionModel.UpdatedBy = data.updatedBy,
            this.actionModel.CreatedDate = data.createdDate,
            this.actionModel.UpdatedDate = data.updatedDate,
            this.actionModel.EventStartDate = data.eventStartDate,
            this.actionModel.EventEndDate = data.eventEndDate,
            this.actionModel.ReminderNotification = data.reminderNotification,
            this.actionModel.RepeatTask = data.repeatTask,
            this.actionModel.Completed = data.completed,
            this.actionModel.Description = data.description,
            this.actionModel.Interval = data.interval,
            this.actionModel.RepeatAfter = data.repeatAfter,
            this.actionModel.Untill = data.untill,
            this.actionModel.UntillDate = data.untillDate,
            this.actionModel.UntillCompile = data.untillCompile,
            this.actionModel.RemindUsing = data.remindUsing,
            this.actionModel.RemindTo = data.remindTo,
            this.actionModel.RepeatEvery = data.repeatEvery,
            this.actionModel.RepeatOnWeekDay = data.repeatOnWeekDay,
            this.actionModel.RepeatOnDay = data.repeatOnDay,
            this.actionModel.WillRepeat = data.willRepeat,
            this.actionModel.WillRepeatWeekDay = data.willRepeatWeekDay,
            this.actionModel.RepeatOnMonth = data.repeatOnMonth,
            this.actionModel.IsAllDay = data.isAllDay,
            this.actionModel.StartTimeZone = data.startTimeZone,
            this.actionModel.EndTimeZone = data.endTimeZone,
            this.actionModel.ShowReminder = data.showReminder,
            this.actionModel.ReminderDate = data.reminderDate,
            this.actionModel.ReminderPerson = data.reminderPerson
        }, error => {
        }, () => { });
    }

    else if (Action == "Task") {
      this.taskService.getTaskById<any>(id)
        .subscribe(data => {
          this.actionModel._id = data._id,
            this.actionModel.ResponsiblePerson = data.responsiblePerson,
            this.actionModel.Subject = data.subject,
            this.actionModel.Priority = data.priority,
            this.actionModel.Types = data.types,
            this.actionModel.CreatedBy = data.createdBy,
            this.actionModel.UpdatedBy = data.updatedBy,
            this.actionModel.CreatedDate = data.createdDate,
            this.actionModel.UpdatedDate = data.updatedDate,
            this.actionModel.EventStartDate = data.eventStartDate,
            this.actionModel.EventEndDate = data.eventEndDate,
            this.actionModel.ReminderNotification = data.reminderNotification,
            this.actionModel.RepeatTask = data.repeatTask,
            this.actionModel.Completed = data.completed,
            this.actionModel.Description = data.description,
            this.actionModel.Interval = data.interval,
            this.actionModel.RepeatAfter = data.repeatAfter,
            this.actionModel.Untill = data.untill,
            this.actionModel.UntillDate = data.untillDate,
            this.actionModel.UntillCompile = data.untillCompile,
            this.actionModel.RemindUsing = data.remindUsing,
            this.actionModel.RemindTo = data.remindTo,
            this.actionModel.RepeatEvery = data.repeatEvery,
            this.actionModel.RepeatOnWeekDay = data.repeatOnWeekDay,
            this.actionModel.RepeatOnDay = data.repeatOnDay,
            this.actionModel.WillRepeat = data.willRepeat,
            this.actionModel.WillRepeatWeekDay = data.willRepeatWeekDay,
            this.actionModel.RepeatOnMonth = data.repeatOnMonth,
            this.actionModel.IsAllDay = data.isAllDay,
            this.actionModel.StartTimeZone = data.startTimeZone,
            this.actionModel.EndTimeZone = data.endTimeZone,
            this.actionModel.ShowReminder = data.showReminder,
            this.actionModel.ReminderDate = data.reminderDate,
            this.actionModel.ReminderPerson = data.reminderPerson
          console.log("mydatacheck", this.actionModel);
          console.log("mydatacheck1",data);
        }, error => {
        }, () => { });
    }
    else {
      this.commentService.getCommentById<any>(id)
        .subscribe(data => {


          this.actionModel._id = data._id,
            this.actionModel.ResponsiblePerson = data.responsiblePerson,
            this.actionModel.Subject = data.subject,
            this.actionModel.CreatedBy = data.createdBy,
            this.actionModel.UpdatedBy = data.updatedBy,
            this.actionModel.CreatedDate = data.createdDate,
            this.actionModel.UpdatedDate = data.updatedDate,
            this.actionModel.Completed = data.completed
        }, error => {
        }, () => { });
    }
  }

  GetHistorySeperator(date) {
    let dated = new Date(date);
    let current = new Date();

    if (dated.getFullYear() === current.getFullYear() && dated.getMonth() === current.getMonth() && dated.getDate() === current.getDate()) {
      return "Today";
    }

    else if (dated.getFullYear() === current.getFullYear() && dated.getMonth() === current.getMonth() && dated.getDate() === current.getDate() - 1) {
      return "Yesterday";
    }
    else {
      return dated.toDateString();
    }
  }

  //Calls Methods
  GetAllCall() {
    this.tabledata = [];
    this.callService.getCall<any>()
      .subscribe(data => {
        data.map((x) => {
          this.tabledata.push({
            Description: x.description,
            Subject: x.callSubject,
            ResponsiblePerson: x.responsiblePerson,
            RepeatTask: x.repeatTask
          })

        });
      }, error => {
      }, () => { });
  }
  AddCall(actionModel) {
    if (actionModel.Subject === undefined || actionModel.Subject === "") {
      alert("Please enter Call Subject");
      return false;
    }
    else {

      this.callService.addCall<any>(actionModel)
        .subscribe(data => {
          this.actionModelVM = data;
          this.GetAllCall();
          this.history.Action = "Call",
            this.history.Subject = actionModel.Subject,
            this.history.ActionId = data._id,
            this.history.Panel = "Lead",
            this.history.Completed = actionModel.Completed,
            this.history.CreatedBy = "1",
            this.history.CreatedDate = new Date(),
            this.history.Button = "Added"
          this.AddHistory(this.history);
          this.actionModel = this.fnActionModel();

        }, error => {
        }, () => { });
    }
  }
  UpdateCall(actionModel) {
    this.callService.updateCall<any>(actionModel)
      .subscribe(data => {
        this.history._id = this.Editedhistoryid,
          this.history.Action = "Call",
          this.history.Subject = actionModel.Subject,
          this.history.ActionId = data._id,
          this.history.Panel = "Lead",
          this.history.Completed = actionModel.Completed,
          this.history.CreatedBy = "1",
          this.history.CreatedDate = new Date(),
          this.history.Button = "Updated"
        this.UpdateHistory(this.history);
        this.Editedhistoryid = "";
        this.ButtonEvent = 'Save';
        this.actionModel = this.fnActionModel();
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
      }, error => {
      }, () => { });
  }
  AddMeeting(actionModel) {
    if (actionModel.Subject === undefined || actionModel.Subject === "") {
      alert("Please enter meeting Subject");
      return false;
    }
    this.meetingService.addMeeting<any>(actionModel)
      .subscribe(data => {
        this.actionModelVM = data;
        this.GetAllMeeting();
        this.history.Action = "Meeting",
          this.history.Subject = actionModel.Subject,
          this.history.ActionId = data._id,
          this.history.Panel = "Lead",
          this.history.Completed = actionModel.Completed,
          this.history.CreatedBy = "2",
          this.history.CreatedDate = new Date(),
          this.history.Button = "Added"
        this.AddHistory(this.history);
        this.actionModel = this.fnActionModel();

      }, error => {
      }, () => { });
  }
  UpdateMeeting(actionModel) {
    this.meetingService.updateMeeting<any>(actionModel)
      .subscribe(data => {
        this.history._id = this.Editedhistoryid,
          this.history.Action = "Meeting",
          this.history.Subject = actionModel.Subject,
          this.history.ActionId = data._id,
          this.history.Panel = "Lead",
          this.history.Completed = actionModel.Completed,
          this.history.CreatedBy = "1",
          this.history.CreatedDate = new Date(),
          this.history.Button = "Updated"
        this.UpdateHistory(this.history);
        this.Editedhistoryid = "";
        this.ButtonEvent = 'Save';
        this.actionModel = this.fnActionModel();
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
      }, error => {
      }, () => { });
  }
  AddTask(actionModel) {
    if (actionModel.Subject === undefined || actionModel.Subject === "") {
      alert("Please enter Task Subject");
      return false;
    }
    this.taskService.addTask<any>(actionModel)
      .subscribe(data => {
        this.actionModelVM = data;
        this.GetAllTask();
        this.history.Action = "Task",
          this.history.Subject = actionModel.Subject,
          this.history.ActionId = data._id,
          this.history.Panel = "Lead",
          this.history.Completed = actionModel.Completed,
          this.history.CreatedBy = "3",
          this.history.CreatedDate = new Date(),
          this.history.Button = "Added"
        this.AddHistory(this.history);
        this.actionModel = this.fnActionModel();
      }, error => {
      }, () => { });
  }
  UpdateTask(actionModel) {
    this.taskService.updateTask<any>(actionModel)
      .subscribe(data => {
        this.history._id = this.Editedhistoryid,
          this.history.Action = "Task",
          this.history.Subject = actionModel.Subject,
          this.history.ActionId = data._id,
          this.history.Panel = "Lead",
          this.history.Completed = actionModel.Completed,
          this.history.CreatedBy = "1",
          this.history.CreatedDate = new Date(),
          this.history.Button = "Updated"
        this.UpdateHistory(this.history);
        this.Editedhistoryid = "";
        this.ButtonEvent = 'Save';
        this.actionModel = this.fnActionModel();

      }, error => {
      }, () => { });
  }

  //Comment Methods
  GetAllComment() {
    this.commenttabledata = [];
    this.commentService.getComment<any>()
      .subscribe(data => {
        data.map((x) => {
          this.commenttabledata.push({
            Description: x.description,
            Subject: x.taskSubject,
            ResponsiblePerson: x.responsiblePerson,
            RepeatTask: x.repeatTask,
            Completed:x.completed
          })
        });
      }, error => {
      }, () => { });
  }
  AddComment(actionModel) {
    if (actionModel.Subject === undefined || actionModel.Subject === "") {
      alert("Please enter comment Subject");
      return false;
    }
    this.commentService.addComment<any>(actionModel)
      .subscribe(data => {
        this.actionModelVM = data;
        this.GetAllComment();
        this.history.Action = "Comment",
          this.history.Subject = actionModel.Subject,
          this.history.ActionId = data._id,
          this.history.Panel = "Lead",
          this.history.Completed = actionModel.Completed,
          this.history.CreatedBy = "4",
          this.history.CreatedDate = new Date(),
          this.history.Button = "Added"
        this.AddHistory(this.history);
        this.actionModel = this.fnActionModel();

      }, error => {
      }, () => { });
  }
  UpdateComment(actionModel) {
    this.commentService.updateComment<any>(actionModel)
      .subscribe(data => {
        this.history._id = this.Editedhistoryid,
          this.history.Action = "Comment",
          this.history.Subject = actionModel.Subject,
          this.history.ActionId = data._id,
          this.history.Panel = "Lead",
          this.history.Completed = actionModel.Completed,
          this.history.CreatedBy = "1",
          this.history.CreatedDate = new Date(),
          this.history.Button = "Updated"
        this.UpdateHistory(this.history);
        this.Editedhistoryid = "";
        this.ButtonEvent = 'Save';
        this.actionModel = this.fnActionModel();

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
            _id: x._id,
            Action: x.action,
            Icon: x.action === 'Call' ? 'fa fa-phone' : (x.action === 'Meeting' ? 'fa fa-user' : (x.action === 'Task' ? 'fa fa-list' : (x.action === 'Comment' ? 'fa fa-comments' : 'fa fa-comments'))),
            ActionId: x.actionId,
            Panel: x.panel,
            Subject: x.subject,
            CreatedBy: x.createdBy,
            CreatedDate: new Date(x.createdDate).toLocaleDateString(),
            Button: x.button,
            Completed: x.completed,
            Divide: this.GetHistorySeperator(x.createdDate)
          })
        });
      }, error => {
      }, () => { });
  }
  AddHistory(history) {
    this.historyService.addHistory<any>(history)
      .subscribe(data => {
        this.GetAllHistory();
      }, error => {
      }, () => { });
  }
  UpdateHistory(history) {
    this.historyService.updateHistory<any>(history)
      .subscribe(data => {
        this.GetAllHistory();
      }, error => {
      }, () => { });
  }

  Clear() {
    this.actionModel = this.fnActionModel();
  }

  fnActionModel(): any {
    return {
      _id: "",
      Subject: "",
      Location: "",
      ResponsiblePerson: "",
      Priority: "2",
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
      RepeatTask: "NEVER",
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
      RepeatOnMonth: "",
      IsAllDay: true,
      StartTimeZone:"",
      EndTimeZone: "",
      ShowReminder: false,
      ReminderDate: "",
      ReminderPerson:""

    }
  }
}

