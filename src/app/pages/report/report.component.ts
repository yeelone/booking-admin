import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { ServiceGQl } from 'src/app/service/graphql';
import { MatDatepicker } from '@angular/material';
import { ElementDef } from '@angular/core/src/view';
import config from 'src/app/config/config';


interface Data {
  username:string,
  breakfast: number,
  lunch: number,
  dinner: number
}

interface Report {
  data: Data[],
  file: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent<D> implements OnInit {
  private subscription: Subscription;
  isLoadingResults:boolean = false;

  source: Report = {data:[], file:""};
  displayedColumns: string[] = ['用户', '早餐', '午餐', '晚餐'];
  picker: MatDatepicker<D>;
  year: string = "";
  month: string = "";

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    
  }

  getReport():void{
    this.isLoadingResults = true  ;
    this.subscription = this.apollo.watchQuery({
      query: ServiceGQl.exportTableGQL,
      variables:{
        year:this.year,
        month:this.month
      },
      fetchPolicy:"no-cache",
      })
    .valueChanges
    .subscribe((result) => { 
        this.isLoadingResults = false  ;
        console.log(result)
        if ( result.data['exportBooking'] ){
          this.source = result.data['exportBooking'];
          this.source.file = config.baseurl + "/" + this.source.file;
        }else{
          alert("查询不到相关数据")
        }
    },(error)=>{
      this.isLoadingResults = false  ;
      alert("error:"+error);
    });
  }

  monthSelectedHandler(event:any, picker:MatDatepicker<Date>) {
    const date = new Date(event);
    console.log(date);
    // this.searchDateValue.setValue(date);
    this.year = date.getFullYear().toString();
    this.month = String(date.getMonth()+1);
    
    picker.close();

    this.getReport();
  }


}
