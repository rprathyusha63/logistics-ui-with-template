import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderDataService } from '../../services/order-data.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  id='';
  order: Order;
  editable=false;
  message:String=''
  statuses:String[]=[];
  orderStatus:String;
  constructor( 
    private orderService: OrderDataService ) { }

  ngOnInit(): void {
    this.statuses=['PENDING','PROCESSING','SHIPPED'];
   this.getOrderById();
    
  }
  getOrderById(){
    this.orderService.getOrdersById(this.orderService.getOrderId()).subscribe(
      success => {
        this.order=success;
        this.orderStatus=this.order.status;
      }
    )
  }
  makeFormEditable(){
    this.editable=true;
    console.log(this.editable);
  }
  cancelEditOperation(){
    this.getOrderById();
    this.editable=false;
  }
  updateOrder(){
    this.orderService.updateOrder(this.order).subscribe(
      success => {
       this.getOrderById();
        this.message=`Updated order with Id ${this.order.orderId}`;
        setTimeout(()=>{
          this.message='';
        },2000)
        this.editable=false;
      }, error => {
        this.message=`Unable to update order with Id ${this.order.orderId}`;
        this.getOrderById()
        setTimeout(()=>{
          this.message='';
        },2000)
        this.editable=false;
      });
      }
    
  }



