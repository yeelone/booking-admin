import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ServiceGQl } from 'src/app/service/graphql';
import { Subscription, of as observableOf } from 'rxjs';

interface Config {
  wxAppID:string;
  wxSecret:string;
  prompt:string;
}

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  private subscription: Subscription;
  isLoadingResults:boolean = false;
  
  submitted = false;
  config:Config = {wxAppID:"",prompt:"",wxSecret:""};

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.getConfig(); 
  }

  getConfig():void{
    this.isLoadingResults = true  ;
    this.subscription = this.apollo.watchQuery({
      query: ServiceGQl.queryConfigGQL,
      fetchPolicy:"no-cache",
      })
    .valueChanges
    .subscribe((result) => { 
        this.isLoadingResults = false  ;
        this.config = result.data['config'];
    },(error)=>{
      this.isLoadingResults = false  ;
      alert("error:"+error);
    });
  }
  onSubmit() {
    this.submitted = true;

    this.isLoadingResults = true  ;
    this.apollo.mutate({
      mutation: ServiceGQl.updateConfigGQL,
      variables: {
        prompt:this.config.prompt,
        wxAppID: this.config.wxAppID,
        wxSecret: this.config.wxSecret,
      },
    }).subscribe((data) => {
      this.isLoadingResults = false;
      alert('成功!! :-)\n\n' );
    },(error) => {  
      this.isLoadingResults = false;
      alert('失败... \n\n' + error );
    });

  }
}
