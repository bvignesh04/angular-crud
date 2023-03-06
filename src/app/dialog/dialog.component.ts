import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

//FOR CLOSING DIALOG
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
// import { Subscription } from 'rxjs';
//for form 

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
statusList = ['Credit','Processing','Not credit']
roleList = ['admin','user','guest']
employeeForm !:FormGroup
actionBtn:string = 'Save'
constructor(private formBuilder:FormBuilder,
  private api:ApiService,
  @Inject(MAT_DIALOG_DATA) public editData :any,
  private dialogRef:MatDialogRef<DialogComponent>){
  // private dialogRef:MatDialogRef<DialogComponent> FOR CLOSING DIALOG,USE THIS IN CONSTRUCTOR FUNCTION

}
ngOnInit(): void {
  //check why we implements OnInit with export class

  this.employeeForm = this.formBuilder.group({
    employee:['',Validators.required],
    designation:['',Validators.required],
    status:['',Validators.required],
    salary:['',Validators.required],
    location:['',Validators.required],
    
    date:['',Validators.required]
    
  });

  if(this.editData){
    this.actionBtn = 'Update'
    this.employeeForm.controls['employee'].setValue(this.editData.employee)
    this.employeeForm.controls['designation'].setValue(this.editData.designation)
    this.employeeForm.controls['status'].setValue(this.editData.status)
    this.employeeForm.controls['salary'].setValue(this.editData.salary)
    this.employeeForm.controls['location'].setValue(this.editData.location)
    this.employeeForm.controls['date'].setValue(this.editData.date)
    
 
  }
}
addProduct(){
  if(!this.editData){
    if(this.employeeForm.valid){
      this.api.postProduct(this.employeeForm.value)
      .subscribe({
        next:(res:any)=>{
          alert('Product added successfully');
          //FOR CLOSING DIALOG
          this.employeeForm.reset()
          this.dialogRef.close('save')
          
        },
        error:()=>{
          alert("Error while Adding the product")
        }
      })
      console.log(this.employeeForm.value)
    }
  }
  else{
    this.updateProduct()
  }
  }
  updateProduct(){
    this.api.putProduct(this.employeeForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product Updated Successfully")
        this.employeeForm.reset()
        this.dialogRef.close('update')
      },
      error:()=>{
        alert("Error while updating the product")
      }
    })
  }
}
