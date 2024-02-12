import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserDataService } from '../../services/user-data.service';
import { LbreadcrumbService } from '../../services/lbreadcrumb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isAuthenticated: boolean = false;
  constructor(private router: Router, private authService: UserDataService,
    private breadcrumbService:LbreadcrumbService) { }

    ngOnInit(): void {
      const token = this.authService.getToken();
      if(token){
          this.isAuthenticated = true;
      }
      console.log("this is token: ", token);
      this.breadcrumbService.setItems([]);
    }

    navigateToVendors(){
          this.router.navigate(['vendors/all']);
    }

    navigateToOrders(){
      this.router.navigate(['orders']);
    }

}
