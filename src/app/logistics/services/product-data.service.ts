import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
 productId:string;

 backendUrl = environment.baseUrl;
 httpOptions = {
   // withCredentials: true,
   headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Accept': 'application/json'
   }),
}

 constructor(private http:HttpClient) { }

 getProductById(){
   return this.http.get<Product>(`${this.backendUrl}/products/${this.productId}`, this.httpOptions);
 }
setProductId(id:string)
{
  this.productId = id;
}
}
