import { Component, OnInit } from '@angular/core';
import { VendorProductsDataService } from '../../services/vendor-products-data.service';
import { VendorProductListResponse } from '../../models/vendor-product-list-response.model';
import { VendorDataService } from '../../services/vendor-data.service';
import { Vendor } from '../../models/vendor.model';

@Component({
  selector: 'app-vendor-products',
  templateUrl: './vendor-products.component.html',
  styleUrls: ['./vendor-products.component.scss']
})
export class VendorProductsComponent implements OnInit {
  vendorId:string;
  vendor:Vendor;
  vendorProducts: VendorProductListResponse[] = [];
  constructor(public vendorProductService: VendorProductsDataService,
    public vendorService:VendorDataService) { }

  ngOnInit(): void {
    this.vendorId = this.vendorProductService.getVendorId();
    this.vendorService.getVendorById(this.vendorId).subscribe(
      success => {
        this.vendor=success;
      }
    )
    this.vendorProductService.getVendorProductsByVendorId().subscribe(
      success =>{
        this.vendorProducts=success;
      }
    )
  }

}
