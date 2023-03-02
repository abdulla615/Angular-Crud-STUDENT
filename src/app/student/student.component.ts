import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { studentdata } from './student.model';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit{
  showadd!:boolean; //unassigned value this method call is back
  showupdate!:boolean; //directives mean *ngfor or *ngif
  studentmodelobj:studentdata = new studentdata;
  allstudentdata:any;
  formvalue!:FormGroup;
  constructor(private formbuilder:FormBuilder, private api:ApiService){} //life cycle hook call aaha moza oru cnstrct ondu call pnnn vm

  ngOnInit(): void {
      this.formvalue= this.formbuilder.group({
        name: ['',Validators.required],
        email: ['',Validators.required],
        mobile: ['',Validators.required],
        city: ['',Validators.required],
  })
     this.getdata();
  }
  
  add(){
  this.showadd=true;//showadd = true is when we will create *ngIF METHOD IT WILL SHOW
  this.showupdate=false;//showadd = false is when we willcreate *ngif method it will not show
  }
  
  edit(data:any){
      this.showadd=false;
      this.showupdate=true;
      this.studentmodelobj.id= data.id

    this.formvalue.controls['name'].setValue(data.name);
    this.formvalue.controls['email'].setValue(data.email);
    this.formvalue.controls['mobile'].setValue(data.mobile);
    this.formvalue.controls['city'].setValue(data.city);
   }

  //edit on update
  update(){
    this.studentmodelobj.name = this.formvalue.value.name;
    this.studentmodelobj.email = this.formvalue.value.email;
    this.studentmodelobj.mobile = this.formvalue.value.mobile;
    this.studentmodelobj.city = this.formvalue.value.city;

    this.api.updatestudent(this.studentmodelobj,this.studentmodelobj.id).subscribe(res=>{
      this.getdata();
      this.formvalue.reset();
     alert('Record update success fully')
    },
    err=>{
    alert('Something went wrong')
    })
  }


   
  //add data from student formvalue
  addstudent(){
    this.studentmodelobj.name = this.formvalue.value.name;
    this.studentmodelobj.email = this.formvalue.value.email;
    this.studentmodelobj.mobile = this.formvalue.value.mobile;
    this.studentmodelobj.city = this.formvalue.value.city;

    this.api.poststudent(this.studentmodelobj).subscribe(res=>{
      console.log(res)
      this.formvalue.reset() // whn we add the data in form autometicaally emty data in form box
      this.getdata(); 
      alert('Record added Success fully');
    },
    err=>{
      alert('something went wrong')
    })
  }

  //get data
  getdata(){
    this.api.getstudent()
    .subscribe(res=>{
   this.allstudentdata=res;
    })
  }
  //delte data
  deletedata(data:any){
    if(confirm('Are you sure to delete data'))
    this.api. deletestudent(data.id)
    .subscribe(res=>{
      alert('Record delted success fully')
      this.getdata()
    })
  }

}
