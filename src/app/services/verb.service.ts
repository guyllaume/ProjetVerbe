import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerbService {

  private apiUrl = "https://seal-app-v5cj7.ondigitalocean.app/v0/verbs/";
  constructor(private http: HttpClient) { }
  
  public getRandomVerbs(quantity: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    return this.http.post(`${this.apiUrl}random`, quantity , { headers});
  }
  public getVerb(verb: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    return this.http.post(`${this.apiUrl}`, {verb: verb} , {headers});
  }
  public addFavorite(verb: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    return this.http.post(`${this.apiUrl}favorites`, verb , {headers});
  }
  public getFavorite(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    return this.http.get(`${this.apiUrl}favorites/${id}`, {headers});
  }
  public getAllFavorite(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    return this.http.get(`${this.apiUrl}favorites/all`, {headers});
  }
  public deleteFavorite(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    return this.http.delete(`${this.apiUrl}favorites/${id}`, {headers});
  }
}
