import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  _config: any;
  constructor(protected http: HttpClient) { }

  private readonly BASE_URL = "https://localhost:44369/api";

  private readonly _AddUrl: string = this.BASE_URL + "/Comment/Add";
  private readonly _AllUrl: string = this.BASE_URL + "/Comment";
  private readonly _UpdateUrl: string = this.BASE_URL + "/Comment/Update";
  private readonly _DeleteUrl: string = this.BASE_URL + "/Comment/Delete";

  getComment<T>(): Observable<T> {
    return this.http.get<T>(this._AllUrl, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }

  getCommentById<T>(id): Observable<T> {
    return this.http.get<T>(this._AllUrl + "/" + id, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }

  addComment<T>(actionModel): Observable<T> {
    return this.http.post<T>(this._AddUrl, actionModel, this.getRequestHeaders())
    //.catch(error => {
    //  return Observable.throw(error);
    //}
    //);
  }

  updateComment<T>(emp): Observable<T> {
    return this.http.put<T>(this._UpdateUrl, emp, this.getRequestHeaders())
  }

  deleteComment<T>(id): Observable<T> {
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

