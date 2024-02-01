import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VendorListResponse } from '../../models/vendor-list-response.model';
import { VendorDataService } from '../../services/vendor-data.service';
import { Vendor } from '../../models/vendor.model';
import { VendorProductsDataService } from '../../services/vendor-products-data.service';
import { UserDataService } from '../../services/user-data.service';
import { User } from '../../models/user.model';
import { WarehouseDataService } from '../../services/warehouse-data.service';
import { WarehouseListResponse } from '../../models/warehouse-list-response.model';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  vendors: VendorListResponse[] = [];
  warehouses: WarehouseListResponse[] = [];
    loading: boolean = false;
    display: boolean = false;
    createdBy: string = "Bhanu Kandregula";
    user:User;
  constructor(
      public vendorService: VendorDataService,
      private messageService: MessageService,
      public router: Router,
      public vendorProductService: VendorProductsDataService,
      public userService: UserDataService,
      public warehouseService: WarehouseDataService
      //private fb: FormBuilder,
  ) { }


  ngOnInit() {
    this.user = this.userService.getAuthenticaedUser()
    this.getAllWarehouses();
      this.fetchVendorsList();
  }
getAllWarehouses(){
  this.warehouseService.getAllWarehouses().subscribe(success =>{
    this.warehouses=success;
  })
}

fetchVendorsList() {
    this.vendorService.getAllVendors().subscribe( response => {
      this.vendors= response;
      console.log(this.vendors)
    });
}

getRowIndex(rowIndex: number): number {
    return rowIndex + 1;
}

onRowClick(vendor: VendorListResponse)  {
    const vendorId = vendor.body.vendorId;
    console.log("This is the clicked vendor: ",vendorId);

    this.vendorProductService.setVendorId(vendorId);
    this.router.navigate(['/productsForVendor']);
}

showSuccessToastAndRoute() {
    this.loading = true;

    this.messageService.add({
        severity: 'info',
        summary: 'Please wait...',
        detail: 'Processing your request.',
        life: 1000
    });

    setTimeout(() => {

        this.messageService.add({
            severity: 'success',
            summary: 'Interview Created',
            detail: 'The interview was created successfully.',
            life: 3000
        });

        // Wait for the toast to be displayed (you can adjust the delay based on your needs)
        setTimeout(() => {
            // Route to the dashboard
            this.display = false;
            this.router.navigate(['/iinterviews']);
        }, 3000);



    }, 1000);

}

    // @ts-ignore
    getSeverity(status: string) {
        switch (status) {
            case 'Selected':
                return 'success';
            case 'Not Selected':
                return 'danger';
            case 'In Hold':
                return 'warning';
        }
    }
}

