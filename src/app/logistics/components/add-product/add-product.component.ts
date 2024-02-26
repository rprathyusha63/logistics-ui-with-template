import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductDataService } from '../../services/product-data.service';
import { MessageService } from 'primeng/api';
import { LbreadcrumbService } from '../../services/lbreadcrumb.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  product: Product = {
    productModel: null,
    categoryName: null,
    brand: null,
    size: null,
    weight: null,
    dimensions: null,
    skuNumber: null,
    material:null,
    noOfPieces:null,
    resolution:null
  };
  categories: String[] = [];
  constructor(
    public productService: ProductDataService,
    private messageService: MessageService,
    public breadcrumbService: LbreadcrumbService
  ) { }


  ngOnInit(): void {
    this.categories = ['shoes','laptops','tv','travel bags','cookware','watches','doorbells'];
    this.breadcrumbService.setItems([
      { label: 'Inventory' },
      { label: 'Add Product' }
    ]);
  }

  addProduct() {
    this.productService.saveProduct(this.product).subscribe(success=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Product added successfully',
        life: 2000
      });
      this.cancelEditOperation()
    },error=>{
      this.messageService.add({
        severity: 'error',
        summary: 'Unable to add product',
        life: 2000
      });
    }
    );
   
  }

  cancelEditOperation() {
    this.product.productModel = null;
    this.product.categoryName = null;
    this.product.brand = null;
    this.product.size = null;
    this.product.weight = null;
    this.product.dimensions = null;
    this.product.skuNumber = null;
    this.product.material = null;
    this.product.noOfPieces = null;
    this.product.resolution = null;
  }
}

