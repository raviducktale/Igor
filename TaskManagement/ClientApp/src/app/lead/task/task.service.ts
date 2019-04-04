import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { Subject } from 'rxjs/Subject';
//import 'rxjs/add/observable/throw';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/mergeMap';
//import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  _config: any;
  constructor(protected http: HttpClient) { }

  private readonly BASE_URL  = "https://localhost:44369/api";

  private readonly _AddUrl: string = this.BASE_URL + "/Task/Add";
  private readonly _AllUrl: string = this.BASE_URL + "/Task";
  private readonly _UpdateUrl: string = this.BASE_URL + "/Task/Update";
  private readonly _UpdateCheckedUrl: string = this.BASE_URL + "/Task/UpdateChecked";
  private readonly _DeleteUrl: string = this.BASE_URL + "/Task/Delete";




  //For Task
  getTask<T>(): Observable<T> {
    return this.http.get<T>(this._AllUrl, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }

  addTask<T>(actionModel): Observable<T> {
    return this.http.post<T>(this._AddUrl, actionModel, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }

  updateTask<T>(emp): Observable<T> {
    return this.http.put<T>(this._UpdateUrl, emp, this.getRequestHeaders())
  }

  updateChecked<T>(emp): Observable<T> {
    
    return this.http.put<T>(this._UpdateCheckedUrl, emp, this.getRequestHeaders())
  }

  deleteTask<T>(id): Observable<T> {
    return this.http.delete<T>(this._DeleteUrl + "/" + id, { headers: this.getHeaders() })
  }

  handleERROR(error) {

  }

  //SET HEADERS
  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers;
    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*'
    });
    return { headers: headers };
  }

  protected getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',

    });
  }
}
