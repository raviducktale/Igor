import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { View, EventSettingsModel, PopupOpenEventArgs, CurrentAction } from '@syncfusion/ej2-schedule';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import * as $ from 'jquery';
import { ScheduleComponent } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})

export class SchedulerComponent {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Explosion of Betelgeuse Star',
        StartTime: new Date(2018, 1, 11, 9, 30),
        EndTime: new Date(2018, 1, 11, 11, 0),
        CategoryColor: '#1aaa55'
      }, {
        Id: 2,
        Subject: 'Thule Air Crash Report',
        StartTime: new Date(2018, 1, 12, 12, 0),
        EndTime: new Date(2018, 1, 12, 14, 0),
        CategoryColor: '#357cd2'
      }]
  };
  public selectedDate: Date = new Date(2019, 3, 1);
  private selectionTarget: Element;
  public onPopupOpen(args: PopupOpenEventArgs): void {
    debugger
    this.selectionTarget = null;
    this.selectionTarget = args.target;
  }
  public onDetailsClick(): void {
    debugger
    this.onCloseClick();
    const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
    this.scheduleObj.openEditor(data, 'Add');
  }
  public onAddClick(): void {
    debugger
    this.onCloseClick();
    const data: Object = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements()) as Object;
    const eventData: { [key: string]: Object } = this.scheduleObj.eventWindow.getObjectFromFormData('e-quick-popup-wrapper');
    this.scheduleObj.eventWindow.convertToEventData(data as { [key: string]: Object }, eventData);
    eventData.Id = this.scheduleObj.eventBase.getEventMaxID() as number + 1;
    this.scheduleObj.addEvent(eventData);
  }
  public onEditClick(args: any): void {
    debugger
    if (this.selectionTarget) {
      let eventData: { [key: string]: Object } = this.scheduleObj.getEventDetails(this.selectionTarget) as { [key: string]: Object };
      let currentAction: CurrentAction = 'Save';
      if (!isNullOrUndefined(eventData.RecurrenceRule) && eventData.RecurrenceRule !== '') {
        if (args.target.classList.contains('e-edit-series')) {
          currentAction = 'EditSeries';
          eventData = this.scheduleObj.eventBase.getRecurrenceEvent(eventData);
        } else {
          currentAction = 'EditOccurrence';
        }
      }
      this.scheduleObj.openEditor(eventData, currentAction);
    }
  }
  public onDeleteClick(args: any): void {
    debugger
    this.onCloseClick();
    if (this.selectionTarget) {
      const eventData: { [key: string]: Object } = this.scheduleObj.getEventDetails(this.selectionTarget) as { [key: string]: Object };
      let currentAction: CurrentAction;
      if (!isNullOrUndefined(eventData.RecurrenceRule) && eventData.RecurrenceRule !== '') {
        currentAction = args.target.classList.contains('e-delete-series') ? 'DeleteSeries' : 'DeleteOccurrence';
      }
      this.scheduleObj.deleteEvent(eventData, currentAction);
    }
  }
  public onCloseClick(): void {
    this.scheduleObj.quickPopup.quickPopupHide();
  }

}





