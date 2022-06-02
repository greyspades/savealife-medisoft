import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup, Validator, Validators, ValidatorFn  } from '@angular/forms';
import { UserService } from '../user.service';
import { Response, LoginResponse } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private user:UserService,
    private router:Router
  ) { }

  loading:boolean=false

  signupForm=new FormGroup({
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
  
  get email() { return this.signupForm.get('email'); }
  
  get password() { return this.signupForm.get('password'); }

  submit(){
     this.loading=true
    console.log(this.signupForm.value)
    this.user.login(this.signupForm.value)
    .subscribe((res:LoginResponse)=>{
      this.loading=false
      if(res[0].status=='success'){
        this.router.navigate(['dashboard'])
      }
    })
  }

  ngOnInit(): void {
  }

}
