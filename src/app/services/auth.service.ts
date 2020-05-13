import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

const API_URL = environment.apiUrl + 'oauth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }


  auth(username, password): Observable<any> {
    const httpParams = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(API_URL + 'login', httpParams);
    // return this.http.post(API_URL + 'login', httpParams, { observe: 'response' });
  }

  loggedIn() {
    return !!localStorage.getItem(environment.tokenName);
  }

  getToken() {
    return localStorage.getItem(environment.tokenName);
  }

  logout() {
    localStorage.removeItem(environment.tokenName);
    localStorage.removeItem('user');
  }

  currentUserValue() {
    return jwt_decode(localStorage.getItem(environment.tokenName));
  }

  refreshToken() {
    this.http.post<any>(API_URL + 'refreshtoken', {}, {
      observe: 'response'
    }).pipe(
      tap(response => {
        console.log(response);
        const token = response.headers.get('X-Token');
        localStorage.setItem(environment.tokenName, token);
      }))
      .subscribe();
  }
}
