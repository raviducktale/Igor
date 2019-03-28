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

  IsReadOnly: true;

  empList: any;

  constructor(protected service: EmpService) {
    this.GetAll();
  }

  ngOnInit() {
  }

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

}
