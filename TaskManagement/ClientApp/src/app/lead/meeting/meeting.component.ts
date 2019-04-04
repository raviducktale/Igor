import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../meeting/meeting.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})

export class MeetingComponent implements OnInit {
 
  meeting: any = {
    id: "",
    MeetingSubject: "",
    Location: "",
    ResponsiblePerson: "",
    Priority: -1,
    CreatedBy: "",
    UpdatedBy: "",
    CreatedDate: "",
    UpdatedDate: "",
    EventStartDate: "",
    EventEndDate: "",
    RepeatTask: -1,
    ReminderNotification: "",
    Completed: -1,
    Description: ""
  }
  meetingList: any;
  priorities: any;
  types: any;
  repeattaskoptions: any;
  completes: any;       
  title = 'Meetings';

  constructor(protected service: MeetingService) {
    this.GetAllMeeting();
  }

  ngOnInit() {
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
  }

  //Methods
  GetAllMeeting() {
    this.service.getMeeting<any>()
      .subscribe(data => {
        this.meetingList = data;
        console.log(this.meetingList);
      }, error => {
      }, () => { });
  }
  AddMeeting(meeting) {
    console.log(meeting);

    this.service.addMeeting<any>(meeting)
      .subscribe(data => {
        this.GetAllMeeting();
        console.log(data);
      }, error => {
      }, () => { });
  }
  EditMeeting(meeting) {
    alert(meeting);

  }
  UpdateMeeting(meeting) {
    alert(meeting);
    this.service.updateMeeting<any>(meeting)
      .subscribe(data => {
        this.GetAllMeeting();
        console.log(data);
      }, error => {
      }, () => { });
  }
  DeleteMeeting(id) {
    alert(id);
    this.service.deleteMeeting<any>(id)
      .subscribe(data => {
        console.log(data);
        this.GetAllMeeting();
      }, error => {
      }, () => { });
  }


}
