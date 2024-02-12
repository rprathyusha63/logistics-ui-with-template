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
    return this.authStatusListener.asObservable();
  }

  login(authTokenRequest: AuthTokenRequest) {
    this.invalidLogin=undefined
    this.http.post<AuthTokenResponse>(`${this.backendUrl}/auth/login`, authTokenRequest)
      .subscribe({
        next: (response) => {
          this.authTokenResponse = response;
          const token = response.jwttoken;
          this.token = token;
          if (token) {
            
            const expirationDate = this.jwtHelper.getTokenExpirationDate(token)
            const expiredInDuration = 3600;
            this.authenticatedUserEmail=response.email;
            this.setAuthTimer(expiredInDuration);
            this.isAuthenticated = true;
           
            this.authStatusListener.next(true);

            const now = new Date();
            
            this.saveAuthData(token, expirationDate);
            this.invalidLogin = false;
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
    this.http.get<User>(`${this.backendUrl}/users/${this.authenticatedUserEmail}`, this.httpOptions)
    .subscribe(success => {
      this.authenticatedUser=success;
      //this.router.navigate(['/vendors','default']);
      this.router.navigate(['/dashboard']);
    }, error =>{
      console.log(error)
    }
    );
    return this.authenticatedUser;
  }
  getAuthenticatedUser(){
    return this.authenticatedUser;
  }
  getDecodedTokenValues() {
    if(this.token){
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
