import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Response { data: any; }

@Injectable({
  providedIn: 'root'
})
export class APIService {

  baseUrl: string = 'http://192.168.0.103:33/';
  loginUrl: string = this.baseUrl + 'login'
  registerUrl: string = this.baseUrl + 'register';
  getUserDetailsUrl:string = this.baseUrl + 'userDetails';
  uploadDataUrl:string = this.baseUrl + 'upload';
  updateExpertOpinionUrl: string = this.baseUrl + 'updateExpertOpinion'
  
  constructor(private http: HttpClient) {}

  getRequest(url, data): Observable<any> {
     return this.http.get<Response>(url, data)
  }

  postRequest(url, data): Observable<any> {
     return this.http.post<Response>(url, data)
  }

  putRequest(url, data): Observable<any> {
     return this.http.put(url, data)
  }
  
}

