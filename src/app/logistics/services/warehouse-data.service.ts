import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WarehouseListResponse } from '../models/warehouse-list-response.model';
import { Warehouse } from '../models/warehouse.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseDataService {
  
  backendUrl = environment.baseUrl;
  httpOptions = {
    // withCredentials: true,
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }),
}

  constructor(private http:HttpClient) { }

  getAllWarehouses(){
    return this.http.get<WarehouseListResponse[]>(`${this.backendUrl}/warehouses`, this.httpOptions);
  }

  getWarehouseById(id){
    return this.http.get<Warehouse>(`${this.backendUrl}/warehouses/${id}`, this.httpOptions);
  }
}

