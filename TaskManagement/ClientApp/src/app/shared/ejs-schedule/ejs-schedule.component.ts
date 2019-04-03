import { Component, OnInit, Input } from '@angular/core';
import { DataManager } from '@syncfusion/ej2-data';
import { SchedulerService } from 'src/app/lead/scheduler/scheduler.service';
import { View, EventSettingsModel } from '@syncfusion/ej2-schedule';


@Component({
  selector: 'app-ejs-schedule',
  templateUrl: './ejs-schedule.component.html',
  styleUrls: ['./ejs-schedule.component.css'],
  // specifies the template string for the Schedule component

})
export class EjsScheduleComponent implements OnInit {

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

  //@Input() currentView: View = 'Month';
  //@Input()  selectedDate: Date = new Date();
  //@Input() eventSettings: EventSettingsModel = {
  //  dataSource: new DataManager({
  //url: 'https://localhost:44369/api/Scheduler',
  //}),
  //};


  constructor(protected schedulerService: SchedulerService) {
    //this.GetAllScheduler();
  }


  ngOnInit() {
    this.ds = [];
  }
  //Scheduler Methods
  //GetAllScheduler() {
  //  this.schedulerService.getScheduler<any>()
  //    .subscribe(data => {
  //      data.map((x) => {
  //        this.ds.push({
  //          Description: x.description,
  //          EndTime: new Date(x.endTime).toISOString(),
  //          EndTimezone: x.endTimezone,
  //          Id: x.id,
  //          IsAllDay: x.isAllDay,
  //          Location: x.location,
  //          StartTime: new Date(x.startTime).toISOString(),
  //          Subject: x.subject,
  //          StartTimezone: x.startTimezone,
  //        })
  //      });
  //    //  this.eventSettings.dataSource = this.ds;
  //      //console.log("dataSource-", this.ds);
  //    }, error => {
  //    }, () => { });
   
  //}
}
