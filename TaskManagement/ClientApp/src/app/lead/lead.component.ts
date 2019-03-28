import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeadComponent implements OnInit {
  leads: any;
  constructor() { }

  ngOnInit() {
    this.leads = [{ id: 1, name: "test1", description: "test sdf test description1", date: "01-01-2019" },
      { id: 4, name: "test2", description: "test test2 sara description2", date: "01-05-2019" },
      { id: 3, name: "test3", description: "test test356 dfytr description3", date: "02-01-2019" },
      { id: 4, name: "test4", description: "test 4444 dfytr description3", date: "03-02-2019" }]
  }

}
