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
  selectedWarehouse: Warehouse;
  dItems:Array<Warehouse>=[];
all:number;
  constructor(
    public vendorService: VendorDataService,
    private messageService: MessageService,
    public router: Router,
    public vendorProductService: VendorProductsDataService,
    public userService: UserDataService,
    public warehouseService: WarehouseDataService,
    public breadcrumbService:LbreadcrumbService,
    public route:ActivatedRoute
    //private fb: FormBuilder,
  ) { }


  ngOnInit() {
   this.all = this.route.snapshot.params['all']
   if(this.all ==0){
    this.selectedWarehouse = this.userService.getWarehouse();
    this.userWarehouseId = this.selectedWarehouse.warehouseId;
    this.getAllWarehouses();
    //this.fetchVendorsList();
    this.fetchVendorsListByWarehouseId(this.userWarehouseId);
   } else if(this.all ==1){
    this.getAllWarehouses();
    this.fetchVendorsList();
   }
    this.breadcrumbService.setItems([
      {label: 'Vendors', routerLink:['/vendors',0]}
  ]);
  }
  getAllWarehouses() {
    this.warehouseService.getAllWarehouses().subscribe(success => {
      this.warehouses = success;
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
    this.fetchVendorsListByWarehouseId(event.value.warehouseId)
  }
}

