import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  _config: any;

  constructor(protected http: HttpClient) { }


  private readonly BASE_URL = "https://localhost:44369/api";

  //Urls
  private readonly _AddSchedulerUrl: string = this.BASE_URL + "/Scheduler/Add";
  private readonly _AllSchedulerUrl: string = this.BASE_URL + "/Scheduler";
  private readonly _UpdateSchedulerUrl: string = this.BASE_URL + "/Scheduler/Update";
  private readonly _DeleteSchedulerUrl: string = this.BASE_URL + "/Scheduler/Delete";


  //Methods
  getScheduler<T>(): Observable<T> {
    return this.http.get<T>(this._AllSchedulerUrl, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }
  addScheduler<T>(scheduler): Observable<T> {
    return this.http.post<T>(this._AddSchedulerUrl, scheduler, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }
  updateScheduler<T>(scheduler): Observable<T> {
    return this.http.put<T>(this._UpdateSchedulerUrl, scheduler, this.getRequestHeaders())

  }
  deleteScheduler<T>(id): Observable<T> {
    return this.http.delete<T>(this._DeleteSchedulerUrl + "/" + id, { headers: this.getHeaders() })
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
