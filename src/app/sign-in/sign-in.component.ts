import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  emailPattern = '"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"'
 
 signUpForm!:FormGroup;
 constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router){}
 ngOnInit():void{
     this.signUpForm = this.formBuilder.group({
      fullName : ['',Validators.required],
      email:['',Validators.required],
      passWord:['',Validators.required],
      mobile:['',Validators.required]
     })
 }

 signUp(){
    this.http.post<any>('http://localhost:3000/signUpUsers',this.signUpForm.value)
    
    .subscribe((res)=>{
      alert('Hurray..!SignUp successful')
      console.log(this.signUpForm.value)
      this.signUpForm.reset()
      this.router.navigate(['login'])
    },err=>{
      alert('Something went wrong!')
    })
 }
}
