import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LbreadcrumbService {

  private itemsSource = new BehaviorSubject<MenuItem[]>([]);

    itemsHandler = this.itemsSource.asObservable();
    items: MenuItem[];
    constructor() {
    }
    setItems(items: MenuItem[]) {
      this.items = items;
        this.itemsSource.next(items);
    }
    getItems(): MenuItem[] {
      return this.items;
  }
}
