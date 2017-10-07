import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { ValidateService } from '../../services/validate.service'
import { AuthService } from '../../services/auth.service'

import { FlashMessagesService } from 'angular2-flash-messages'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String
  username: String
  email: String
  password: String

  constructor(
    private router: Router,
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessages: FlashMessagesService) {  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // console.log(this.password)

    if(!this.validateService.validateRegister(user)){
      this.flashMessages.show('Uncomplete user credentials!', {cssClass:'alert-danger', timeout: 3000} )
      return false
    }

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessages.show('Wrong Email format!', {cssClass:'alert-danger', timeout: 3000} )
      return false
    }

    this.authService.registerUser(user).subscribe(data=>{
      if(data.success) {
        this.flashMessages.show('Registration successful!', {cssClass:'alert-success', timeout: 3000} )
        this.router.navigate(['/login'])
      } else {
        this.flashMessages.show('Ups...', {cssClass:'alert-success', timeout: 3000} )
        this.router.navigate(['/register'])
      }
    })

  }

}
