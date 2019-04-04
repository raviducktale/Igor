import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task/task.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {


  emp: any = {
    id: "",
    TaskId: "",
    TaskText: "",
    ResponsiblePerson: "",
    Priority: -1,
    CreatedBy: "",
    UpdatedBy: "",
    CreatedOn: new Date(),
    UpdatedOn: new Date(),
    EventStartDate: new Date(),
    EventEndDate: new Date(),
    Completed: -1,
    RepeatTaskId: "",
    ReminderNotificationId: ""
  }

  IsReadOnly: true;

  empList: any;
  priorities: any;
  completeds: any;
  constructor(protected service: TaskService) { this.GetAll(); }

  ngOnInit() {
    this.priorities = [{ name: "High", value: 1 },
    { name: "Medium", value: 2 },
    { name: "Low", value: 3 }]

    this.completeds = [{ name: "Yes", value: true },
    { name: "No", value: false }]
  }

  toggleComplete(checked) {
    
    alert(checked);
    this.service.updateChecked<any>(checked)
      .subscribe(data => {
        this.GetAll();
        console.log(data);
      }, error => {
      }, () => { });
  }

  //For Task
  GetAll() {
    this.service.getTask<any>()
      .subscribe(data => {
        this.empList = data;
        //this.empList.map((x) => {
          
        //  //x.CreatedOn = new Date(x.CreatedOn);
        //  x.CreatedOn = new Date(Date.parse(x.CreatedOn));
         
        //})
        console.log(data);
      }, error => {
      }, () => { });
  }


  Add(emp) {
    
    console.log(emp);


    if (this.emp.Priority == -1) {
      alert("Please Select Priority");
      return false;

    }
    if (this.emp.Completed == -1) {
      alert("Please Select Completed");
      return false;

    }
    this.service.addTask<any>(emp)
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
    this.service.updateTask<any>(emp)
      .subscribe(data => {
        this.GetAll();
        console.log(data);
      }, error => {
      }, () => { });
  }

  Delete(id) {
    alert(id);
    this.service.deleteTask<any>(id)
      .subscribe(data => {
        console.log(data);
        this.GetAll();
      }, error => {
      }, () => { });
  }


}
