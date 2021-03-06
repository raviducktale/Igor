import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var require: any;

@Injectable()
export class EmpService {
  _config: any;

  constructor(protected http: HttpClient) {
  }
  private readonly BASE_URL = "https://localhost:44369/api";

  private readonly _AddUrl: string = this.BASE_URL + "/Task/Add";
  private readonly _AllUrl: string = this.BASE_URL + "/Task";
  private readonly _UpdateUrl: string = this.BASE_URL + "/Task/Update";
  private readonly _DeleteUrl: string = this.BASE_URL + "/Task/Delete";


  private readonly _AddUrlComment: string = this.BASE_URL + "/Comment/Add";
  private readonly _AllUrlComment: string = this.BASE_URL + "/Comment";
  private readonly _UpdateUrlComment: string = this.BASE_URL + "/Comment/Update";
  private readonly _DeleteUrlComment: string = this.BASE_URL + "/Comment/Delete";

  //Call Url
  private readonly _AddCallUrl: string = this.BASE_URL + "/Call/Add";
  private readonly _AllCallUrl: string = this.BASE_URL + "/Call";
  private readonly _UpdateCallUrl: string = this.BASE_URL + "/Call/Update";
  private readonly _DeleteCallUrl: string = this.BASE_URL + "/Call/Delete";

  //Meeting Url
  private readonly _AddMeetingUrl: string = this.BASE_URL + "/Meeting/Add";
  private readonly _AllMeetingUrl: string = this.BASE_URL + "/Meeting";
  private readonly _UpdateMeetingUrl: string = this.BASE_URL + "/Meeting/Update";
  private readonly _DeleteMeetingUrl: string = this.BASE_URL + "/Meeting/Delete";



  //For Comment
  getComment<T>(): Observable<T> {
    return this.http.get<T>(this._AddUrlComment, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }
  addComment<T>(cmt): Observable<T> {
    debugger
    return this.http.post<T>(this._AddUrlComment, cmt, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }
  updateComment<T>(cmt): Observable<T> {
    return this.http.put<T>(this._UpdateUrlComment, cmt, this.getRequestHeaders())
  }
  deleteComment<T>(id): Observable<T> {
    return this.http.delete<T>(this._DeleteUrlComment + "/" + id, { headers: this.getHeaders() })
  }


  //For Task
  getTask<T>(): Observable<T> {
    return this.http.get<T>(this._AllUrl, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }
  addTask<T>(emp): Observable<T> {
    debugger
    return this.http.post<T>(this._AddUrl, emp, this.getRequestHeaders())
      //.catch(error => {
      //  return Observable.throw(error);
      //}
      //);
  }
  updateTask<T>(emp): Observable<T> {
    return this.http.put<T>(this._UpdateUrl, emp, this.getRequestHeaders())
  }
  deleteTask<T>(id): Observable<T> {
    return this.http.delete<T>(this._DeleteUrl + "/" + id, { headers: this.getHeaders() })
  }
  handleERROR(error) {
   
  }



  //Employee
  getEmp<T>(): Observable<T> {
    return this.http.get<T>(this._AllUrl, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }
  addEmp<T>(emp): Observable<T> {
    return this.http.post<T>(this._AddUrl, emp, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }
  updateEmp<T>(emp): Observable<T> {
    return this.http.put<T>(this._UpdateUrl, emp, this.getRequestHeaders())
  }
  deleteEmp<T>(id): Observable<T> {
    return this.http.delete<T>(this._DeleteUrl + "/" + id, { headers: this.getHeaders() })
  }

  //Call
  getCall<T>(): Observable<T> {
    return this.http.get<T>(this._AllCallUrl, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }
  addCall<T>(call): Observable<T> {
    return this.http.post<T>(this._AddCallUrl, call, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }
  updateCall<T>(call): Observable<T> {
    return this.http.put<T>(this._UpdateCallUrl, call, this.getRequestHeaders())
  }
  deleteCall<T>(id): Observable<T> {
    return this.http.delete<T>(this._DeleteCallUrl + "/" + id, { headers: this.getHeaders() })
  }

  //Meeting
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

