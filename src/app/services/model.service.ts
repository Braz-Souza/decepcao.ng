import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private apiUrl = '/model';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const params = new HttpParams().set('message', message);
    return this.http.get(this.apiUrl, { params, responseType: 'text' });
  }
}
