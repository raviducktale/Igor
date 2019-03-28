import { Component } from '@angular/core';
import { EmpService } from './services/emp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
  emp: any = {
    id: "", name: "", age: ""
  }

  IsReadOnly: true;

  empList: any;

  constructor(protected service: EmpService) {
    this.GetAll();
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
