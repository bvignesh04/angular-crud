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
freshnessList = ['Fresh','Brand New','Refurbished']
productForm !:FormGroup
actionBtn:string = 'Save'
constructor(private formBuilder:FormBuilder,
  private api:ApiService,
  @Inject(MAT_DIALOG_DATA) public editData :any,
  private dialogRef:MatDialogRef<DialogComponent>){
  // private dialogRef:MatDialogRef<DialogComponent> FOR CLOSING DIALOG,USE THIS IN CONSTRUCTOR FUNCTION

}
ngOnInit(): void {
  //check why we implements OnInit with export class

  this.productForm = this.formBuilder.group({
    productName:['',Validators.required],
    category:['',Validators.required],
    freshness:['',Validators.required],
    price:['',Validators.required],
    comment:['',Validators.required],
    date:['',Validators.required]
    
  });

  if(this.editData){
    this.actionBtn = 'Update'
    this.productForm.controls['productName'].setValue(this.editData.productName)
    this.productForm.controls['category'].setValue(this.editData.category)
    this.productForm.controls['freshness'].setValue(this.editData.freshness)
    this.productForm.controls['price'].setValue(this.editData.price)
    this.productForm.controls['comment'].setValue(this.editData.comment)
    this.productForm.controls['date'].setValue(this.editData.date)
 
  }
}
addProduct(){
  if(!this.editData){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res:any)=>{
          alert('Product added successfully');
          //FOR CLOSING DIALOG
          this.productForm.reset()
          this.dialogRef.close('save')
          
        },
        error:()=>{
          alert("Error while Adding the product")
        }
      })
      console.log(this.productForm.value)
    }
  }
  else{
    this.updateProduct()
  }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product Updated Successfully")
        this.productForm.reset()
        this.dialogRef.close('update')
      },
      error:()=>{
        alert("Error while updating the product")
      }
    })
  }
}
