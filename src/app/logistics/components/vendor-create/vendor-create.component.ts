import { Component, OnInit, Inject } from '@angular/core';
import { WarehouseListResponse } from '../../models/warehouse-list-response.model';
import { VendorDataService } from '../../services/vendor-data.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { WarehouseDataService } from '../../services/warehouse-data.service';
import { Warehouse } from '../../models/warehouse.model';
import { Vendor } from '../../models/vendor.model';
import { LbreadcrumbService } from '../../services/lbreadcrumb.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.scss']
})
export class VendorCreateComponent implements OnInit {

  warehouses: WarehouseListResponse[] = [];
  selectedWarehouse: any;
  dItems: any[] = [];
  vendor: Vendor = {
    businessName: null,
    type: null,
    warehouse: null,
    warehouseId: null,
    email: null,
    phone: null,
    location: null
  };
  types: String[] = [];
  businessName: String;
  constructor(
    public vendorService: VendorDataService,
    private messageService: MessageService,
    public router: Router,
    public warehouseService: WarehouseDataService,
    public breadcrumbService: LbreadcrumbService,
    public dialogRef: MatDialogRef<VendorCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
    this.types = ['Retailer', 'Manufacturer', 'Distributor'];
    this.getAllWarehouses();
    this.breadcrumbService.setItems([
      { label: 'Add Vendor' }
    ]);
  }
  getAllWarehouses() {
    this.warehouseService.getAllWarehouses().subscribe(success => {
      this.warehouses = success;
      for (var wlist of this.warehouses) {
        this.dItems.push(wlist.body)
      }
    })
  }
  addVendor() {
    this.vendor.warehouseId = this.selectedWarehouse.warehouseId;
    this.vendorService.saveVendor(this.vendor).subscribe(
      success => {
        this.messageService.add({
          severity: 'success',
          summary: 'Vendor created successfully',
          life: 10000
        });
        this.dialogRef.close(true);
      },error =>{

      }
    );
        
    
  }

  cancelEditOperation() {
    this.vendor.businessName = null;
    this.vendor.warehouse = null;
    this.vendor.warehouseId = null;
    this.vendor.email = null;
    this.vendor.phone = null;
    this.vendor.location = null;
    this.vendor.type = null;
    this.selectedWarehouse = null;
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
