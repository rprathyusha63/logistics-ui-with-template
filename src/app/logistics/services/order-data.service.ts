import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Order } from '../models/order.model';
import { OrderList } from '../models/order-list.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  orderId:string;
  backendUrl = environment.baseUrl;
  httpOptions = {
    // withCredentials: true,
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }),
}

  constructor(private http:HttpClient) { }

  getAllOrders(){
    return this.http.get<Order[]>(`${this.backendUrl}/orders`, this.httpOptions);
  }

  
  getOrdersByWarehouse(warehouseId:string){
    return this.http.get<Order[]>(`${this.backendUrl}/orders/warehouse/${warehouseId}`, this.httpOptions);
  }

  getTodayOrders(){
    return this.http.get<Order[]>(`${this.backendUrl}/orders/today`, this.httpOptions);
  }

  getOrdersById(orderId:string){
    return this.http.get<Order>(`${this.backendUrl}/orders/${orderId}`, this.httpOptions);
  }
  setOrderId(orderId:string)
  {
    this.orderId=orderId;
  }

}
