import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-update-confirmation-dialog',
  templateUrl: './order-update-confirmation-dialog.component.html',
  styleUrls: ['./order-update-confirmation-dialog.component.scss']
})
export class OrderUpdateConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderUpdateConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
