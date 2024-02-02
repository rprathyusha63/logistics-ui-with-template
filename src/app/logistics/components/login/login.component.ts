import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { AuthTokenRequest } from '../../models/auth-token-request.model';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username:string = '';
  password:string= '';
  authTokenRequest: AuthTokenRequest ;
  message = 'invalid credentials'
invalidmessageFlag=false;

  constructor(private router: Router,
    private loginService: UserDataService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loginService.invalidLogin=undefined;
  }
handleLogin(){
  this.authTokenRequest= new AuthTokenRequest(this.username, this.password);
}
isUserLoggedIn(){
  return !(null === sessionStorage.getItem('authToken'))
}
  onLogin(form: NgForm){
    console.log(form.value)
    if(form.invalid){
        return;
    }
    this.authTokenRequest= new AuthTokenRequest(form.value.signin_email, form.value.signin_password);
    this.loginService.login(this.authTokenRequest);
    console.log('invalid login is ' + this.loginService.invalidLogin)
    if(this.loginService.invalidLogin){
        this.messageService.add({
            severity: 'error',
            summary: 'Incorrect password.',
            detail: 'Please re-enter your credentials.',
            life: 1500
        });
        this.loginService.invalidLogin = undefined;
    } else if(!this.loginService.invalidLogin){
     
        this.messageService.add({
            severity: 'success',
            summary: 'Logged in successfully.',
            detail: 'You have successfully logged In.',
            life: 1500
        });
        this.loginService.invalidLogin = undefined;
    }
  }

}
