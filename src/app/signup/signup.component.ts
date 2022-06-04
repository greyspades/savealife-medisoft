import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validator, Validators, ValidatorFn  } from '@angular/forms';
import { UserService } from '../user.service';
import { Response } from '../types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private user:UserService,
    private router:Router
  ) { }

  loading:boolean=false

  //* controls and validates form input
  signupForm=new FormGroup({
    first_name: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
    ]),
    last_name: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(8)
    ]),
    
  })

  passwordVisible:string="password"

  //* toggles password vissibility
  togglePassword():void {
    if(this.passwordVisible=="password"){
      this.passwordVisible='text'
    } 
    else if(this.passwordVisible=="text"){
      this.passwordVisible='password'
    }
  }
  
  
  //* ensures only numbers are inputed into the phone field
  numericOnly(event:any): boolean {    
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
  
  //*getters for retrieving form field instance
  get firstName() { return this.signupForm.get('first_name'); }
  
  get lastName() { return this.signupForm.get('last_name'); }
  
  get email() { return this.signupForm.get('email'); }
  
  get password() { return this.signupForm.get('password'); }

  //* submits a valid form
  submit(){
    this.loading=true
    this.user.signUp(this.signupForm.value)
    .subscribe((res:Response)=>{
      this.loading=false
      if(res.status=='success'){
        this.user.toggleLogin()
        this.router.navigate(['dashboard'])
      }
    })
  }
  

  ngOnInit(): void {
  }

}
