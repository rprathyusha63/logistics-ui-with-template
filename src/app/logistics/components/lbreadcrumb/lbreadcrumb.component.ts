import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LbreadcrumbService } from '../../services/lbreadcrumb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lbreadcrumb',
  templateUrl: './lbreadcrumb.component.html',
  styleUrls: ['./lbreadcrumb.component.scss']
})
export class LbreadcrumbComponent {

  subscription: Subscription;

    items: MenuItem[];

    constructor(public breadcrumbService: LbreadcrumbService) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
