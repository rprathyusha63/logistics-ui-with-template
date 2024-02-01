import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VendorProductListResponse } from '../models/vendor-product-list-response.model';
import { VendorProduct } from '../models/vendor-product.model';

@Injectable({
  providedIn: 'root'
})
export class VendorProductsDataService {
  id:string;
  backendUrl = environment.baseUrl;
  httpOptions = {
    // withCredentials: true,
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }),
}

  constructor(private http:HttpClient) { }

  setVendorId(vendorId){
    this.id=vendorId;
  }
  getVendorId(){
    return this.id;
  }
  getAllVendorProducts(){
    return this.http.get<VendorProductListResponse[]>(`${this.backendUrl}/vendorproducts`, this.httpOptions);
  }

  getVendorProductsByVendorId(){
    return this.http.get<VendorProductListResponse[]>(`${this.backendUrl}/vendorproducts/${this.id}`, this.httpOptions);
  }

  deleteVendorProduct(id){
    console.log(id)
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.delete(`${this.backendUrl}/vendorproducts/${id}`,{headers, responseType:'text'});
  }

  saveVendorProduct(vendorProduct: VendorProduct){
    return this.http.post<VendorProduct>(`${this.backendUrl}/vendorproducts`,vendorProduct, this.httpOptions);
  }

}
