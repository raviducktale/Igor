import { Component, OnInit } from '@angular/core';
import { SchedulerService } from '../scheduler/scheduler.service';
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {


  scheduler: any = {
    id: "",
    SchedulerId: "",
    Subject: "",
    StartTime: "",
    EndTime: -1,
    StartTimezone: -1,
    EndTimezone: "",
    Location: "",
    Description: "",
    IsAllDay: "",
    Recurrence: "",
    RecurrenceRule: "",
    Frequency: -1,
    Interval: "",
    Count: true,
    IsReadonly: "",
    IsBlock: "",
    Untill: -1,
    ByDay: "",
    BYMonthDay: true,
    BYMonth: "",
    BYSetPOS: ""
  }
  schedulerList: any;

  constructor(protected service: SchedulerService) {
    this.GetAllScheduler();
  }

  ngOnInit() {

  }

  //Methods
  GetAllScheduler() {
    this.service.getScheduler<any>()
      .subscribe(data => {
        this.schedulerList = data;
        console.log(this.schedulerList);
      }, error => {
      }, () => { });
  }
  AddScheduler(scheduler) {
    console.log(scheduler);
    this.service.addScheduler<any>(scheduler)
      .subscribe(data => {
        this.GetAllScheduler();
        console.log(data);
      }, error => {
      }, () => { });
  }
 
  UpdateScheduler(scheduler) {
    alert(scheduler);
    this.service.updateScheduler<any>(scheduler)
      .subscribe(data => {
        this.GetAllScheduler();
        console.log(data);
      }, error => {
      }, () => { });
  }
  DeleteScheduler(id) {
    alert(id);
    this.service.deleteScheduler<any>(id)
      .subscribe(data => {
        this.GetAllScheduler();
        console.log(data);
      }, error => {
      }, () => { });
  }


}







