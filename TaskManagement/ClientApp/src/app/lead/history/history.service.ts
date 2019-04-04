import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var require: any;


@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  _config: any;

  constructor(protected http: HttpClient) { }


 private readonly BASE_URL = "https://localhost:44369/api";

  //Urls
  private readonly _AddHistoryUrl: string = this.BASE_URL + "/History/Add";
  private readonly _AllHistoryUrl: string = this.BASE_URL + "/History";
  private readonly _UpdateHistoryUrl: string = this.BASE_URL + "/History/Update";
  private readonly _DeleteHistoryUrl: string = this.BASE_URL + "/History/Delete";


  //Methods
  getHistory<T>(): Observable<T> {
    return this.http.get<T>(this._AllHistoryUrl, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }
  addHistory<T>(call): Observable<T> {
    return this.http.post<T>(this._AddHistoryUrl, call, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }
  updateHistory<T>(call): Observable<T> {
    return this.http.put<T>(this._UpdateHistoryUrl, call, this.getRequestHeaders())

  }
  deleteHistory<T>(id): Observable<T> {
    return this.http.delete<T>(this._DeleteHistoryUrl + "/" + id, { headers: this.getHeaders() })
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
