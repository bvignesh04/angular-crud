
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import{DialogComponent} from '../dialog/dialog.component'
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  title = 'Login Authentication';

  displayedColumns: string[] = ['employee', 'designation','date', 'status', 'salary','location','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog:MatDialog,private api:ApiService){

  }
  ngOnInit(): void {
    this.getAllProducts()
  }


  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    
    }).afterClosed().subscribe(val=>{
      if(val == 'save'){      //this is just like refresh to get the exact data after updating
        this.getAllProducts()
      }
    })
}
getAllProducts(){
 this.api.getProduct().subscribe({
  next:(res)=>{
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  },
  error:(err)=>{
    alert('Error Whiling Fetching Records')
  }
 })
}

editProduct(row:any){
  this.dialog.open(DialogComponent,{
    width:'30%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val == 'update'){  //this is just like refresh to get the exact data after updating
      this.getAllProducts()
    }
  })
}


deleteProduct(id:number){
   this.api.deleteProduct(id).subscribe({
    next:(res)=>{
      alert("Product deleted")
      this.getAllProducts();
    },
    error:(res)=>{
      alert("Error while deleting the product")
    }
    
   })
}



applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}




