import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderDataService } from '../../services/order-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderUpdateConfirmationDialogComponent } from '../order-update-confirmation-dialog/order-update-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  image:any;
  barcodeImageUrl:string;
  constructor( 
    private orderService: OrderDataService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.statuses=['PENDING','PROCESSING','SHIPPED'];
   this.getOrderById();
    
  }
  getOrderById(){
    this.orderService.getOrdersById(this.orderService.getOrderId()).subscribe(
      success => {
        this.order=success;
        this.orderStatus=this.order.status;
        if(this.orderStatus==='SHIPPED' && this.order.shippingNumber.length){
          this.orderService.getBarcode(this.order.orderId)
          .subscribe((response :any) => {
          
            const reader = new FileReader();
            reader.onload = (event: any) => {
              this.barcodeImageUrl = event.target.result;
            };
            reader.readAsDataURL(response);
          });
        }
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
       if(this.order.status=='SHIPPED' && this.order.shippingNumber.length){
        this.orderService.getBarcode(this.order.orderId)
        .subscribe((response :any) => {
        
          const reader = new FileReader();
          reader.onload = (event: any) => {
            this.barcodeImageUrl = event.target.result;
          };
          reader.readAsDataURL(response);
        });
       }
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

      openConfirmationDialog(): void {
        if(this.order.status == 'SHIPPED'){
        const dialogRef = this.dialog.open(OrderUpdateConfirmationDialogComponent, {
          width: '400px',
          data: { title: 'Confirm', message: 'Are you sure you want to proceed? Once moved to Shipped, Status cannot be changed' }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.updateOrder();
          } else {
          }
        });
      } else{
        this.updateOrder();
      }
    }
      
    
  }



