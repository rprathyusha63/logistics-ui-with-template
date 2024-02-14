import { Component, OnInit } from '@angular/core';
import { VendorProductsDataService } from '../../services/vendor-products-data.service';
import { VendorProductListResponse } from '../../models/vendor-product-list-response.model';
import { VendorDataService } from '../../services/vendor-data.service';
import { Vendor } from '../../models/vendor.model';
import { LbreadcrumbService } from '../../services/lbreadcrumb.service';
import { VendorListResponse } from '../../models/vendor-list-response.model';
import { ProductDataService } from '../../services/product-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-products',
  templateUrl: './vendor-products.component.html',
  styleUrls: ['./vendor-products.component.scss']
})
export class VendorProductsComponent implements OnInit {
  vendorId:string;
  vendor:Vendor;
  vendorProducts: VendorProductListResponse[] = [];
  displaySize:boolean=true;
  constructor(public vendorProductService: VendorProductsDataService,
    public vendorService:VendorDataService, 
    public breadcrumbService: LbreadcrumbService,
    public productService : ProductDataService,
    public router : Router) { 
      
    }

  ngOnInit(): void {
    this.vendorId = this.vendorProductService.getVendorId();
    this.vendorService.getVendorById(this.vendorId).subscribe(
      success => {
        this.vendor=success;
        this.breadcrumbService.setItems([
          {label: 'Vendors'},
          {label: this.vendor.businessName},
          {label: 'Products'}
      ]);
      }
    )
    this.vendorProductService.getVendorProductsByVendorId().subscribe(
      success =>{
        this.vendorProducts=success;
        for(var vendorProduct of this.vendorProducts)
      {
        if(vendorProduct.body.product.categoryName == 'doorbells')
         { 
          this.displaySize=false;
          console.log('displaysize '+this.displaySize)
          break;
         } 

      }
      }
    )
    
  }

  onRowClick(vendorProduct: VendorProductListResponse){
    //console.log(vendorProduct.body.product.productID)
    this.productService.setProductId(vendorProduct.body.product.productID);
    this.router.navigate(['/productDetails']);
  }

}
