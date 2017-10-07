import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Router, CanActivate } from '@angular/router';
import 'rxjs/add/operator/map'

import { tokenNotExpired } from 'angular2-jwt'


@Injectable()
export class AuthService {

  authToken: any
  user: any

  constructor(private http: Http, private router: Router) { }

  registerUser(user) {
    let headers = new Headers()

    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers })
      .map(res => res.json())
  }

  authenticateUser(user) {
    let headers = new Headers()

    headers.append('Content-Type', 'application/json')
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers })
      .map(res => res.json())
  }

  getProfile() {
    let headers = new Headers()
    //this.loadToken()
    headers.append('Authentication', localStorage.getItem('id_token'))

    headers.append('Content-Type', 'application/json')
    return this.http.get('http://localhost:3000/users/profile', { headers: headers })
      .map(res => res.json())
  }

  loggedIn() {
    console.log(tokenNotExpired())
    return tokenNotExpired()
  }

  hasActiveLogin() {
    if (localStorage.getItem('username')) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
}
  
  loadToken(){
    this.authToken = localStorage.getItem('id_token')
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
  }

  logout() {
    this.authToken = null
    this.user = null
    localStorage.clear()
  }

}
