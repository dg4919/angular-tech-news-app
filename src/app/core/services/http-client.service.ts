import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.apiKey}`
    });
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, { headers: this.headers });
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body, { headers: this.headers });
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body, { headers: this.headers });
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, { headers: this.headers });
  }
}