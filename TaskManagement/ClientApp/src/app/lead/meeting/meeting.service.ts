import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var require: any;

@Injectable({
  providedIn: 'root'
})

export class MeetingService {
  _config: any;

  constructor(protected http: HttpClient) {
  }

  // Urls
  private readonly BASE_URL = "https://localhost:44369/api";
  private readonly _AddMeetingUrl: string = this.BASE_URL + "/Meeting/Add";
  private readonly _AllMeetingUrl: string = this.BASE_URL + "/Meeting";
  private readonly _UpdateMeetingUrl: string = this.BASE_URL + "/Meeting/Update";
  private readonly _DeleteMeetingUrl: string = this.BASE_URL + "/Meeting/Delete";

  //Methods
  getMeeting<T>(): Observable<T> {
    return this.http.get<T>(this._AllMeetingUrl, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }
  addMeeting<T>(meeting): Observable<T> {
    return this.http.post<T>(this._AddMeetingUrl, meeting, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }
  updateMeeting<T>(meeting): Observable<T> {
    return this.http.put<T>(this._UpdateMeetingUrl, meeting, this.getRequestHeaders())
  }
  deleteMeeting<T>(id): Observable<T> {
    return this.http.delete<T>(this._DeleteMeetingUrl + "/" + id, { headers: this.getHeaders() })
  }

  //SET HEADERS
  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers;
    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return { headers: headers };
  }
  protected getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
