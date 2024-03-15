import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VendorListResponse } from '../../models/vendor-list-response.model';
import { VendorDataService } from '../../services/vendor-data.service';
import { Vendor } from '../../models/vendor.model';
import { VendorProductsDataService } from '../../services/vendor-products-data.service';
import { UserDataService } from '../../services/user-data.service';
import { User } from '../../models/user.model';
import { WarehouseDataService } from '../../services/warehouse-data.service';
import { WarehouseListResponse } from '../../models/warehouse-list-response.model';
import { Warehouse } from '../../models/warehouse.model';
import { LbreadcrumbService } from '../../services/lbreadcrumb.service';
import { Subscription } from 'rxjs';
import { VendorCreateComponent } from '../vendor-create/vendor-create.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  vendors: VendorListResponse[] = [];
  warehouses: WarehouseListResponse[] = [];
  userWarehouseId: string;
  userWarehouseName: string;
  selectedWarehouse: any;
  dItems:any[]=[];
  subscription: Subscription;
all:string;
  constructor(
    public vendorService: VendorDataService,
    private messageService: MessageService,
    public router: Router,
    public vendorProductService: VendorProductsDataService,
    public userService: UserDataService,
    public warehouseService: WarehouseDataService,
    public breadcrumbService:LbreadcrumbService,
    public route:ActivatedRoute,
    public dialog: MatDialog
    //private fb: FormBuilder,
  ) { }


  ngOnInit() {
   this.all = this.route.snapshot.params['all']
   if(this.all =='all'){
    this.getAllWarehouses();
    this.fetchVendorsList();
   } else {
    this.selectedWarehouse = this.userService.getWarehouse();
    this.userWarehouseId = this.selectedWarehouse.warehouseId;
    this.getAllWarehouses();
    //this.fetchVendorsList();
    this.fetchVendorsListByWarehouseId(this.userWarehouseId);
   }  
    this.breadcrumbService.setItems([
      {label: 'Vendors'}
  ]);
  
  }
  getAllWarehouses() {
    this.warehouseService.getAllWarehouses().subscribe(success => {
      this.warehouses = success;
      let allWarehouse: Warehouse={
        warehouseName:"All"
      }
      this.dItems.push(allWarehouse)
      for(var wlist of this.warehouses)
      {
        this.dItems.push(wlist.body)
      }
     
    })

   
  }

  fetchVendorsList() {
    this.vendorService.getAllVendors().subscribe(response => {
      this.vendors = response;
    });
  }

  fetchVendorsListByWarehouseId(warehouseId) {
    this.vendorService.getVendorsByWarehouse(warehouseId).subscribe(response => {
      this.vendors = response;
      console.log(this.vendors)
    });
  }

  getRowIndex(rowIndex: number): number {
    return rowIndex + 1;
  }

  onRowClick(vendor: VendorListResponse) {
    const vendorId = vendor.body.vendorId;
    console.log("This is the clicked vendor: ", vendorId);

    this.vendorProductService.setVendorId(vendorId);
    this.router.navigate(['/productsForVendor']);
  }

  onWarehouseDropdownChange(event) {
    if(event.value.warehouseName=='All'){
      this.fetchVendorsList();
    }
    else {
      this.fetchVendorsListByWarehouseId(event.value.warehouseId)
    }
  }
  /*addNewVendor(){
    this.router.navigate(['/create-vendor']);
  }*/
  addNewVendor(): void {
    
    const dialogRef = this.dialog.open(VendorCreateComponent, {
      width: '600px',
      //data: { title: 'Confirm', message: 'Are you sure you want to proceed? Once moved to Shipped, Status cannot be changed' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchVendorsList();
    });
  
}
  
}

