import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AppMainComponent } from 'src/app/app.main.component';
import { UserDataService } from '../../services/user-data.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ltopbar',
  templateUrl: './ltopbar.component.html',
  styleUrls: ['./ltopbar.component.scss']
})
export class LtopbarComponent implements OnInit, OnDestroy {

  userIsAuthenticated: boolean = false;
  decodedToken: string = '';
  userFullObject: string = '';
  username:string='';
  private authListerSubs: Subscription;
  items: MenuItem[] | undefined;


  constructor(public app: AppComponent,
    public appMain: AppMainComponent,
    public authService: UserDataService) { }

  ngOnInit(): void {
    this.authListerSubs = this.authService.authStatusListener.subscribe(isAuthenticated => {

      this.userIsAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.items = [
          { label: 'Dashboard'},
          { label: 'Vendors & Products', routerLink:['/vendors/default']},
          { label: 'Orders', routerLink:['/orders'] }
      ];
        
        this.decodedToken = this.authService.getDecodedTokenValues();
        this.userFullObject = JSON.stringify(this.decodedToken);
        const userData = JSON.parse(this.userFullObject);
        this.username=this.authService.getUsername();
      }
    });
  }

  ngOnDestroy(): void {
    this.authListerSubs.unsubscribe();
  }


  logout() {
    this.authService.logout();
    this.items=[];
  }


}
