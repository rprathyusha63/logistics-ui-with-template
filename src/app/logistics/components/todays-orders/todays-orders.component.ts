import { Component, OnInit } from '@angular/core';
import { OrderDataService } from '../../services/order-data.service';
import { LbreadcrumbService } from '../../services/lbreadcrumb.service';
import { Router } from '@angular/router';
import { OrderList } from '../../models/order-list.model';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-todays-orders',
  templateUrl: './todays-orders.component.html',
  styleUrls: ['./todays-orders.component.scss']
})
export class TodaysOrdersComponent implements OnInit {

  orderId:string;
  
  orders: Order[] = [];
  constructor(public orderService: OrderDataService,
    public breadcrumbService: LbreadcrumbService,
    public router : Router) { 
      
    }

  ngOnInit(): void {
    
    this.orderService.getTodayOrders().subscribe(
      success => {
        this.orders=success;
        this.breadcrumbService.setItems([
          {label: 'Orders', routerLink:['/orders']}
      ]);
      }, error =>{
        this.orders=[];
      }
    )
    
  }

  onRowClick(order: OrderList){
    //console.log(vendorProduct.body.product.productID)
    this.orderService.setOrderId(order.body.orderId);
    this.router.navigate(['/orderDetails']);
  }

}