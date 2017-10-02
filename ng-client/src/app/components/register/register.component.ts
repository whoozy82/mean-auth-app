import { Component, OnInit } from '@angular/core'
import { FlashMessagesService } from 'angular2-flash-messages'
import { ValidateService } from '../../services/validate.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

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
    private flashMessages: FlashMessagesService,
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router) {  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

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
