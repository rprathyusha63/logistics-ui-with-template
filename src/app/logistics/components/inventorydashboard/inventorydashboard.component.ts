import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { LbreadcrumbService } from '../../services/lbreadcrumb.service';

@Component({
  selector: 'app-inventorydashboard',
  templateUrl: './inventorydashboard.component.html',
  styleUrls: ['./inventorydashboard.component.scss']
})
export class InventorydashboardComponent implements OnInit {

  isAuthenticated: boolean = false;
  constructor(private router: Router, private authService: UserDataService,
    private breadcrumbService:LbreadcrumbService) { }

    ngOnInit(): void {
      const token = this.authService.getToken();
      if(token){
          this.isAuthenticated = true;
      }
      console.log("this is token: ", token);
      this.breadcrumbService.setItems([
        {label: 'Inventory'}
    ]);
    }

    addNewProduct(){
          this.router.navigate(['add-product']);
    }

    updateInventory(){
      this.router.navigate(['update-inventory']);
    }

    addInventory(){
      this.router.navigate(['add-inventory']);
    }


}
