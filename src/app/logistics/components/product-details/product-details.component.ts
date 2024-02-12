import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../../services/product-data.service';
import { Product } from '../../models/product.model';
import { MenuItem } from 'primeng/api';
import { LbreadcrumbService } from '../../services/lbreadcrumb.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product:Product;
  items: MenuItem[];
  items_C : MenuItem[]=[];

  constructor(private productService: ProductDataService,
    private breadcrumbService: LbreadcrumbService) { }

  ngOnInit(): void {
    this.productService.getProductById().subscribe(response =>{
      this.product = response;
      this.items = this.breadcrumbService.getItems()
      this.items_C.push(this.items[0]);
      this.items_C.push(this.items[1])
      this.items_C.push({label: 'Products'})
      this.items_C.push({label: this.product.productModel})
      this.items=this.items_C;
      console.log(this.items_C)
      console.log(this.items)
      this.breadcrumbService.setItems(this.items);
    });
  }

}
