import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items: MenuItem[] | undefined;
isUserAuthenticated:boolean;
    activeItem: MenuItem | undefined;

    tabs: { title: string, content: string }[] = [];

    ngOnInit() {
      this.isUserAuthenticated = this.userService.getIsAuthenticated()
        this.tabs = [
            { title: 'Tab 1', content: 'Tab 1 Content'},
            { title: 'Tab 2', content: 'Tab 2 Content' },
            { title: 'Tab 3', content: 'Tab 3 Content' }
        ];
    }

    constructor(private router:Router,
      private userService: UserDataService){}

    /*ngOnInit() {
      this.isUserAuthenticated = this.userService.getIsAuthenticated()
      console.log('inside dashboard init '+this.isUserAuthenticated)
        this.items = [*/
            /*{ label: 'Vendors', icon: 'pi pi-fw pi-home', command: () => {
              this.router.navigate(["./vendors/default"])
            } },*/
            /*{ label: 'Vendors', icon: 'pi pi-fw pi-home', routerLink: ["/vendors/default"]
            },
            { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
            { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
            { label: 'Documentation', icon: 'pi pi-fw pi-file' },
            { label: 'Settings', icon: 'pi pi-fw pi-cog' }
        ];
        
        
        this.activeItem = this.items[0];
    }*/

}
