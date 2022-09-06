import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserServiceService } from 'src/app/services/userService.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerationForm!: FormGroup;
  user!: User;
  userSubmitted: boolean = false;
  constructor(private fb : FormBuilder, private userService : UserServiceService , private alertService : AlertifyService) { }

  ngOnInit() {
     this.createRegisterationForm();
  }
  createRegisterationForm() {
this.registerationForm = this.fb.group({
  userName: [null,Validators.required],
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.minLength(8)]],
  confirmPassword:[null,[Validators.required]],
  mobile:[null,[Validators.required,Validators.maxLength(10)]]
},{validators: this.passwordMatchingValidator})
  }
  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null :
      { notmatched: true }
  };
  onSubmit(){

    if(this.registerationForm.valid)
    {
      this.userSubmitted = true;
    //console.log(this.registerationForm.value);
   // this.user = Object.assign(this.user, this.registerationForm.value);
    this.userService.addUser(this.userData());
    this.registerationForm.reset();
    this.userSubmitted = false;
    this.alertService.success();
    }
    else
    {
      this.alertService.failure();

    }

  }
  userData() : User{
    return this.user = {
      userName : this.userName.value,
      email : this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    }
  }

  get f(){
    return this.registerationForm;
  }
  get userName()
  {
    return this.registerationForm.get('userName') as FormControl;
  }
  get email()
  {
    return this.registerationForm.get('email') as FormControl;
  }
  get password()
  {
    return this.registerationForm.get('password') as FormControl;
  }
  get confirmPassword()
  {
    return this.registerationForm.get('confirmPassword') as FormControl;
  }
  get mobile()
  {
    return this.registerationForm.get('mobile') as FormControl;
  }
}
