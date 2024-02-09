import { Component, OnInit } from '@angular/core';
import { OrderDataService } from '../../services/order-data.service';
import { LbreadcrumbService } from '../../services/lbreadcrumb.service';
import { Router } from '@angular/router';
import { OrderList } from '../../models/order-list.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orderId:string;
  
  orders: OrderList[] = [];
  constructor(public orderService: OrderDataService,
    public breadcrumbService: LbreadcrumbService,
    public router : Router) { 
      
    }

  ngOnInit(): void {
    
    this.orderService.getAllOrders().subscribe(
      success => {
        this.orders=success;
        this.breadcrumbService.setItems([
          {label: 'Orders', routerLink:['/orders']}
      ]);
      }
    )
    
  }

  onRowClick(order: OrderList){
    //console.log(vendorProduct.body.product.productID)
    this.orderService.setOrderId(order.body.orderId);
    this.router.navigate(['/orderDetails']);
  }

}
