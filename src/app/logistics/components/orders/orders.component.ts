import { Component, OnInit } from '@angular/core';
import { OrderDataService } from '../../services/order-data.service';
import { LbreadcrumbService } from '../../services/lbreadcrumb.service';
import { Router } from '@angular/router';
import { OrderList } from '../../models/order-list.model';
import { Order } from '../../models/order.model';
import { WarehouseDataService } from '../../services/warehouse-data.service';
import { WarehouseListResponse } from '../../models/warehouse-list-response.model';
import { Warehouse } from '../../models/warehouse.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orderId:string;
  
  orders: Order[] = [];

  warehouses: WarehouseListResponse[] = [];
  selectedWarehouse: any;
  dItems:any[]=[];
  constructor(public orderService: OrderDataService,
    public breadcrumbService: LbreadcrumbService,
    public warehouseService: WarehouseDataService,
    public router : Router) { 
      
    }

  ngOnInit(): void {
    this.getAllWarehouses();
    this.getAllOrders();
    
  }
getAllOrders(){
  this.orderService.getAllOrders().subscribe(
    success => {
      this.orders=success;
      this.breadcrumbService.setItems([
        {label: 'Orders'}
    ]);
    }
  )
}

getOrdersByWarehouse(warehouseId:string){
  this.orderService.getOrdersByWarehouse(warehouseId).subscribe(
    success => {
      this.orders=success;
      this.breadcrumbService.setItems([
        {label: 'Orders'}
    ]);
    }
  )
}
  onRowClick(order: Order){
    //console.log(vendorProduct.body.product.productID)
    this.orderService.setOrderId(order.orderId);
    this.router.navigate(['/orderDetails']);
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

  onWarehouseDropdownChange(event) {
    if(event.value.warehouseName=='All'){
     this.getAllOrders();
    }
    else {
      this.getOrdersByWarehouse(event.value.warehouseId);
    }
  }

}
