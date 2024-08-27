import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://seal-app-v5cj7.ondigitalocean.app/v0/users/";
  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, { email, password });
  }

  public signup(email: string, name: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}signup`, { email, name, password });
  }

}
