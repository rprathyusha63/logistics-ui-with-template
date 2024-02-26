import { Component, OnInit } from '@angular/core';
import { VendorListResponse } from '../../models/vendor-list-response.model';
import { VendorDataService } from '../../services/vendor-data.service';
import { MessageService } from 'primeng/api';
import { VendorProductListResponse } from '../../models/vendor-product-list-response.model';
import { VendorProductsDataService } from '../../services/vendor-products-data.service';
import { ProductDataService } from '../../services/product-data.service';
import { ProductListResponse } from '../../models/product-list-response.model';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {
  vendors: VendorListResponse[] = [];
  products: ProductListResponse[] = [];
  dVendorItems:any[]=[];
  dProductItems:any[]=[];

  constructor( public vendorService: VendorDataService,
    private messageService: MessageService,
    public productService: ProductDataService,) { }

  ngOnInit(): void {
    this.fetchVendorsList();
    this.fetchAllProducts();
  }
  fetchVendorsList() {
    this.vendorService.getAllVendors().subscribe(response => {
      this.vendors = response;
      for(var wlist of this.vendors)
      {
        this.dVendorItems.push(wlist.body)
      }
    });
  }
  fetchAllProducts(){
    this.productService.getAllProducts().subscribe(response => {
      this.products = response;
      for(var wlist of this.products)
      {
        this.dProductItems.push(wlist.body)
      }
    });
  }
}
