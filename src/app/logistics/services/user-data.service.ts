import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthTokenRequest } from '../models/auth-token-request.model';
import { AuthTokenResponse } from '../models/auth-token-response.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from '../models/decoded-token';
import { User } from '../models/user.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  backendUrl = environment.baseUrl;
  private tokenTimer: any;
  private isAuthenticated = false;
  private authenticatedUserEmail:string;
  private authenticatedUser:User;
  private token: string | undefined;
  private authTokenResponse: AuthTokenResponse;
  public authStatusListener = new Subject<boolean>();
  private jwtHelper = new JwtHelperService();
  public invalidLogin: boolean = undefined;

  httpOptions = {
    // withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
  }

  constructor(private http: HttpClient,
    private router: Router) { }

  getAuthStatusListener() {
    console.log("getAuthStatusListener status: ", this.authStatusListener);
    return this.authStatusListener.asObservable();
  }

  login(authTokenRequest: AuthTokenRequest) {
    console.log('before '+this.invalidLogin)
    this.invalidLogin=undefined
    this.http.post<AuthTokenResponse>(`${this.backendUrl}/auth/login`, authTokenRequest)
      .subscribe({
        next: (response) => {
          console.log("Used logged in successfully", response)
          this.authTokenResponse = response;
          const token = response.jwttoken;
          console.log('token is '+token)
          this.token = token;
          if (token) {
            
            const expirationDate = this.jwtHelper.getTokenExpirationDate(token)
            const expiredInDuration = 3600;
            this.authenticatedUserEmail=response.email;
            this.setAuthTimer(expiredInDuration);
            
            console.log('inside subscribe and after setAUthUser');
            this.isAuthenticated = true;
           
            this.authStatusListener.next(true);

            const now = new Date();
            //const expirationDate = new Date(now.getTime() + expiredInDuration * 1000);

            this.saveAuthData(token, expirationDate);
            this.invalidLogin = false;
            console.log('after '+this.invalidLogin)
            this.setAuthenticatedUser()
           
          } else {
            console.log("Something is wrong with the token")
          }
        },
        error: (error) => {
          console.error("Error while logging in: ", error.message)
          if (error.status != 200) {
            this.invalidLogin = true;
          } 
          console.log('after '+this.invalidLogin)
        },
        complete: () => {
        
        }
      })
  }

  getWarehouse(){
    return this.authenticatedUser.warehouse;
  }

  getUsername(){
    return this.authTokenResponse.username;
  }
  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  getAuthenticatedUserEmail(){
    return this.authenticatedUserEmail;
  }
  setAuthenticatedUser(){
    console.log('setAuthenticatedUser starting');
    this.http.get<User>(`${this.backendUrl}/users/${this.authenticatedUserEmail}`, this.httpOptions)
    .subscribe(success => {
      console.log('inside setAuthenticatedUser user ');
      console.log(success)
      this.authenticatedUser=success;
      console.log('setAuthenticatedUser auth user ');
      console.log(this.authenticatedUser)
      this.router.navigate(['/vendors','default']);
      //this.router.navigate(['/dashboard']);
    }, error =>{
      console.log('inside setAUthUSer error');
      console.log(error)
    }
    );
    console.log('setAuthenticatedUser before returning');
    return this.authenticatedUser;
  }
  getAuthenticatedUser(){
    return this.authenticatedUser;
  }
  getDecodedTokenValues() {
    if(this.token){
      console.log(this.jwtHelper.decodeToken(this.token));
        return this.jwtHelper.decodeToken(this.token);
    }
    return null;
  }
  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
}

setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
        this.logout();
    }, duration * 1000);
}

logout(){
    this.authStatusListener.next(false);
    this.token = '';
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
}

private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
}

}
