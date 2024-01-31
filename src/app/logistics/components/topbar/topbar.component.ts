import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppMainComponent } from 'src/app/app.main.component';
import { UserDataService } from '../../services/user-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ltopbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {

  userIsAuthenticated: boolean = false;
  decodedToken: string = '';
  userFullObject: string = '';
  userFirstName: string = '';
  userLastname: string = '';
  private authListerSubs: Subscription;
  constructor(public app: AppComponent,
    public appMain: AppMainComponent,
    public authService: UserDataService) { }

  ngOnInit(): void {
    this.authListerSubs = this.authService.authStatusListener.subscribe(isAuthenticated => {

      this.userIsAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.decodedToken = this.authService.getDecodedTokenValues();
        this.userFullObject = JSON.stringify(this.decodedToken);
        const userData = JSON.parse(this.userFullObject);
        this.userFirstName = userData.firstname.trim();
        this.userLastname = userData.lastname.trim();
      }
    });
  }

  ngOnDestroy(): void {
    this.authListerSubs.unsubscribe();
  }


  logout() {
    this.authService.logout();
  }


}
