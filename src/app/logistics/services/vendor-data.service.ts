import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VendorListResponse } from '../models/vendor-list-response.model';
import { environment } from '../environments/environment';
import { Vendor } from '../models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorDataService {

  backendUrl = environment.baseUrl;
  httpOptions = {
    // withCredentials: true,
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }),
}

  constructor(private http:HttpClient) { }

  getAllVendors(){
    return this.http.get<VendorListResponse[]>(`${this.backendUrl}/vendors`, this.httpOptions);
  }

  getVendorsByWarehouse(warehouseId:string){
    return this.http.get<VendorListResponse[]>(`${this.backendUrl}/vendors/findByWarehouseId/${warehouseId}`, this.httpOptions);
  }

  getVendorById(id){
    return this.http.get<Vendor>(`${this.backendUrl}/vendors/${id}`, this.httpOptions);
  }

  deleteVendor(id){
    console.log(id)
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.delete(`${this.backendUrl}/vendors/${id}`,{headers, responseType:'text'});
  }

  saveVendor(vendor: Vendor){
    return this.http.post<Vendor>(`${this.backendUrl}/vendors`,vendor, this.httpOptions);
  }

}
