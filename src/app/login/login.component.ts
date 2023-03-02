import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
 loginform! : FormGroup;
  constructor(private formBuilder:FormBuilder, private router:Router , private http:HttpClient){}

 ngOnInit(): void {
    this.loginform=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    }) 
 }
 login(){
  console.log('submit is working');
   this.http.get<any>("http://localhost:3000/signup").subscribe(res =>{
    //match the email and password
    const user=res.find((a:any)=>{
      return  a.email === this.loginform.valid && a.password === this.loginform.value.password
    })
    //conditio0n
   if (user){
    alert('succss fully loged in');
    this.loginform.reset();

    this.router.navigate(['student'])
   }else{
    alert('user is not found these credential');
   }

   },
   err=>{
    alert('something went wrong')
   })
 }
}
