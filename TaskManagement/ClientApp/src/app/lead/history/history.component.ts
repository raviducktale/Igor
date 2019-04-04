import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../history/history.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: any = {
    id: "",
    Action: "",
    Panel: "",
    CreatedBy: "",
    CreatedDate: "",
    Button: "",
  }
  historyList: any;
  priorities: any;
 

  constructor(protected historyservice: HistoryService) {
    this.GetAllHistory();
  }

  ngOnInit() {
  }

  //Methods
  GetAllHistory() {
    this.historyservice.getHistory<any>()
      .subscribe(data => {
        this.historyList = data;
        console.log(this.historyList);
      }, error => {
      }, () => { });
  }
  AddHistory(call) {
    console.log(call);
    this.historyservice.addHistory<any>(call)
      .subscribe(data => {
        this.GetAllHistory();
        console.log(data);
      }, error => {
      }, () => { });
  }
 
  UpdateHistory(call) {
    alert(call);
    this.historyservice.updateHistory<any>(call)
      .subscribe(data => {
        this.GetAllHistory();
        console.log(data);
      }, error => {
      }, () => { });
  }
  DeleteCall(id) {
    alert(id);
    this.historyservice.deleteHistory<any>(id)
      .subscribe(data => {
        this.GetAllHistory();
        console.log(data);
      }, error => {
      }, () => { });
  }


}
