import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
declare var require: any;


@Injectable({
  providedIn: 'root'
})
export class CallService {
  _config: any;

  constructor(protected http: HttpClient) { }


 private readonly BASE_URL = "https://localhost:44369/api";

  //Urls
  private readonly _AddCallUrl: string = this.BASE_URL + "/Call/Add";
  private readonly _AllCallUrl: string = this.BASE_URL + "/Call";
  private readonly _UpdateCallUrl: string = this.BASE_URL + "/Call/Update";
  private readonly _DeleteCallUrl: string = this.BASE_URL + "/Call/Delete";


  //Methods
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
