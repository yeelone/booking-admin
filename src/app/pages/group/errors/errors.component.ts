import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


interface DialogData {
  errors: string[];
}

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {
  source: DialogData;

  constructor(public dialogRef: MatDialogRef<ErrorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.source = data;
      console.log( this.source.errors);
    }

  ngOnInit() {
  }

}
