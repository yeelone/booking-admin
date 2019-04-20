import { Component ,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { ServiceGQl } from '../../../service/graphql';
import { Apollo } from 'apollo-angular';

export interface DialogData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changeForm: FormGroup;
  currentUser:User;
  submitted = false;
  isLoadingResults = false;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,private formBuilder: FormBuilder,private apollo: Apollo,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }
  
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || new User();

    this.changeForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: this.MustMatch('password', 'confirmPassword')
  });

  }
  // convenience getter for easy access to form fields
  get f() { return this.changeForm.controls; }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changeForm.invalid) {
        return;
    }

    this.isLoadingResults = true  ;
    this.apollo.mutate({
      mutation: ServiceGQl.updateUserGQL,
      variables: {
        id:this.currentUser.id,
        password: this.changeForm.controls['password'].value
      },
    }).subscribe((data) => {
      this.isLoadingResults = false;
      this.onNoClick();
      alert('成功!! :-)\n\n' );
    },(error) => {
      this.isLoadingResults = false;
      alert('失败... \n\n' + error );
    });

  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
}