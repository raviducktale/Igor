import { Component, OnInit } from '@angular/core';
import { EmpService } from '../services/emp.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  title = 'Angular';
  emp: any = {
    id: "", name: "", age: ""
  }
  empList: any;
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
  callList: any;
  meeting: any = {
    id: "",
    MeetingId: "",
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
  repeattaskoptions : any;
  completes : any;       

  constructor(protected service: EmpService) {
    this.GetAll();
    this.GetAllCall();
    this.GetAllMeeting();
  }

  ngOnInit() {
    this.priorities = [{name:"High",value:1},
      { name: "Medium", value: 2},
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
  //Employee
  GetAll() {
    this.service.getEmp<any>()
      .subscribe(data => {
        this.empList = data;
        console.log(data);
      }, error => {
      }, () => { });
  }
  Add(emp) {
    console.log(emp);

    this.service.addEmp<any>(emp)
      .subscribe(data => {
        this.GetAll();
        console.log(data);
      }, error => {
      }, () => { });
  }
  Edit(emp) {
    alert(emp);
    IsReadOnly: false;
  }
  Update(emp) {
    alert(emp);
    this.service.updateEmp<any>(emp)
      .subscribe(data => {
        this.GetAll();
        console.log(data);
      }, error => {
      }, () => { });
  }
  Delete(id) {
    alert(id);
    this.service.deleteEmp<any>(id)
      .subscribe(data => {
        console.log(data);
        this.GetAll();
      }, error => {
      }, () => { });
  }


  //Call
  GetAllCall() {
    this.service.getCall<any>()
      .subscribe(data => {
        this.callList = data;
        console.log(this.callList);
      }, error => {
      }, () => { });
  }
  AddCall(call) {
    console.log(call);

    this.service.addCall<any>(call)
      .subscribe(data => {
        this.GetAllCall();
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
        console.log(data);
        this.GetAllCall();
      }, error => {
      }, () => { });
  }

  //Meeting
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
