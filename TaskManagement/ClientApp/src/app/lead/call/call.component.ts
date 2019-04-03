import { Component, OnInit } from '@angular/core';
import { CallService } from '../call/call.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})

export class CallComponent implements OnInit {
 
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
    Completed: "",
    Description: ""
  }
  callList: any;
  priorities: any;
  types: any;
  repeattaskoptions: any;
  completes: any;  
  title = 'Calls';

  constructor(protected service: CallService) {
    this.GetAllCall();
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
        this.GetAllCall();
        console.log(data);
      }, error => {
      }, () => { });
  }

}
