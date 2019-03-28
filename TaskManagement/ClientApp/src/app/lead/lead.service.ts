import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LeadService {
  private readonly BASE_URL = "https://localhost:44369/api";
  private readonly _getUrl: string = this.BASE_URL + "/Lead";
  constructor(protected http: HttpClient) { }


  getLead<T>(): Observable<T> {
    return this.http.get<T>(this._getUrl, this.getRequestHeaders())
      //.catch(error => {
        // return Observable.throw(error);
      //});
  }

  
  //SET HEADERS
  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let headers;
    headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return { headers: headers };
  }

  protected getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

}
