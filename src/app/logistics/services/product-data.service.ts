import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { ProductListResponse } from '../models/product-list-response.model';

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
 getAllProducts(){
  return this.http.get<ProductListResponse[]>(`${this.backendUrl}/products`, this.httpOptions);
}
 saveProduct(product:Product){
  return this.http.post<Product>(`${this.backendUrl}/products`, product, this.httpOptions);
 }
setProductId(id:string)
{
  this.productId = id;
}
}
