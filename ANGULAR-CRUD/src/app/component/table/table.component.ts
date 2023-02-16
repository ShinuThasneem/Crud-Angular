import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup}from '@angular/forms'
import { StdService } from 'src/app/service/std.service';
import { StudentModel } from './table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

formValue !:FormGroup

// object for model

modelObj:StudentModel=new StudentModel();
studentData !:any;

  constructor(private formbuilder: FormBuilder,private apiService:StdService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
    name:[''],
     email:[''],
      phone:[''],
      age:[''],
     course:['']
    })
    this.getAllStudents();
  }

  postStdDetails(){
    this.modelObj.name=this.formValue.value.name;
    this.modelObj.email=this.formValue.value.email;
    this.modelObj.phone=this.formValue.value.phone;
    this.modelObj.age=this.formValue.value.age;
    this.modelObj.course=this.formValue.value.course;
    this.apiService.postStudent(this.modelObj).subscribe(res=>{
      console.log(res);
      alert("Student Added Successfully..!");
// to cancel
let ref=document.getElementById('cancel')
ref?.click();

      // to reset
      this.formValue.reset();
      this.getAllStudents();
    },err=>{
      alert("Something Went wrong...!");
    })
  }

  getAllStudents(){
    this.apiService.getStudent().subscribe(res=>{
this.studentData=res;
    })
  }
  deleteStudent( row:any){
    this.apiService.DeleteStudent(row.id)
    .subscribe(res=>{
      alert("Deleted Successfully........!!!!!")
      this.getAllStudents();
    })
  }

  EditStudent(row:any){
    this.modelObj.id=row.id;
this.formValue.controls['name'].setValue(row.name);
this.formValue.controls['email'].setValue(row.name);
this.formValue.controls['phone'].setValue(row.name);
this.formValue.controls['age'].setValue(row.name);
this.formValue.controls['course'].setValue(row.name);

  }
  updateStudentDetails(){
    this.modelObj.name=this.formValue.value.name;
    this.modelObj.email=this.formValue.value.email;
    this.modelObj.phone=this.formValue.value.phone;
    this.modelObj.age=this.formValue.value.age;
    this.modelObj.course=this.formValue.value.course;

    this.apiService.updateStudent(this.modelObj,this.modelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully...!")
      alert("Student Added Successfully..!");
      // to cancel
      let ref=document.getElementById('cancel')
      ref?.click();
      
            // to reset
            this.formValue.reset();
            this.getAllStudents();
    })
  }
  

}
