import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../models/vendor.model';
import { MenuItem } from 'primeng/api';
import { VendorDataService } from '../../services/vendor-data.service';
import { LbreadcrumbService } from '../../services/lbreadcrumb.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {

  vendor: Vendor;
  items: MenuItem[];
  vendorId: string;

  constructor(private vendorService: VendorDataService,
    private breadcrumbService: LbreadcrumbService,
    private route:ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.vendorId = this.route.snapshot.params['vendorId']
    this.vendorService.getVendorById(this.vendorId).subscribe(response => {
      this.vendor = response;
      this.breadcrumbService.setItems([
        {label: 'Vendors', routerLink:['/vendors','all']},
        {label: this.vendor.businessName}
    ]); 
  });
     
  }

}