import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router){}
  ngOnInit():void{
    this.loginForm = this.formBuilder.group({
      
      email:['',Validators.required],
      passWord:['',Validators.required]
    })
  }

  login(){
    this.http.get<any>('http://localhost:3000/signUpUsers')
    .subscribe((res)=>{
      const user = res.find((data:any)=> data.email === this.loginForm.value.email && data.passWord === this.loginForm.value.passWord);
      if(user){
        alert('Login successful')
        this.loginForm.reset()
        this.router.navigate(['data'])
      }
      else{alert(' oops..!User Not Found')}
      

    },err=>
      alert('Something went wrong'))
    }
   
  }


