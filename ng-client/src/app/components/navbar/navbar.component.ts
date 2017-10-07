import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth.service'

import { FlashMessagesService } from 'angular2-flash-messages'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean

  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessages: FlashMessagesService) {
      this.loggedIn = authService.loggedIn()
     }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout()
    this.flashMessages.show('You have been logged out', {cssClass: 'alert-warning', timeout: 3000})
    this.router.navigate(['login'])
    return false
  }

}
