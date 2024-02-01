import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VendorListResponse } from '../../models/vendor-list-response.model';
import { VendorDataService } from '../../services/vendor-data.service';
import { Vendor } from '../../models/vendor.model';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  vendors: VendorListResponse[] = [];
    loading: boolean = false;
    display: boolean = false;
    createdBy: string = "Bhanu Kandregula";
    //dropdownControl: FormControl = new FormControl();
    dropdownInterviewResults = [{name: 'Selected'}, {name: 'Not Selected'}, {name: 'In Hold'}, {name: 'Schedule Another Round'} ];
    selectedInterviewResult: any = null;

  constructor(
      public vendorService: VendorDataService,
      private messageService: MessageService,
      public router: Router,
      //private fb: FormBuilder,
  ) { }


  ngOnInit() {
      this.fetchVendorsList();
  }


fetchVendorsList() {
    this.vendorService.getAllVendors().subscribe( response => {
      this.vendors= response;
      console.log(this.vendors)
    });
}

getRowIndex(rowIndex: number): number {
    return rowIndex + 1;
}

onRowClick(vendor: Vendor)  {
    const interviewId = vendor.vendorId;
    console.log("This is the clicked interview ID: ",interviewId);

    //this.vendorService.setSelectedInterview(interviewId);
    this.router.navigate(['/iinterviews', interviewId]);
}

showSuccessToastAndRoute() {
    this.loading = true;

    this.messageService.add({
        severity: 'info',
        summary: 'Please wait...',
        detail: 'Processing your request.',
        life: 1000
    });

    setTimeout(() => {

        this.messageService.add({
            severity: 'success',
            summary: 'Interview Created',
            detail: 'The interview was created successfully.',
            life: 3000
        });

        // Wait for the toast to be displayed (you can adjust the delay based on your needs)
        setTimeout(() => {
            // Route to the dashboard
            this.display = false;
            this.router.navigate(['/iinterviews']);
        }, 3000);



    }, 1000);

}

    // @ts-ignore
    getSeverity(status: string) {
        switch (status) {
            case 'Selected':
                return 'success';
            case 'Not Selected':
                return 'danger';
            case 'In Hold':
                return 'warning';
        }
    }
}

