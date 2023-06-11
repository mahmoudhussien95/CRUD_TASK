import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroupDirective ,FormGroup,FormControl,FormBuilder,FormControlName, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
 empForm : FormGroup;
  education :string[]=[
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(private _fb:FormBuilder ,
     private _empService:EmployeeService ,
     private _dialogRef: MatDialogRef <EmpAddEditComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any
     ){
    this.empForm = this._fb.group({
      firstname:new FormControl('',[ Validators.required,Validators.pattern(/^[a-zA-Z0-9_\.]+$/)] ),
      lastname:new FormControl('',[ Validators.required,Validators.pattern(/^[a-zA-Z0-9_\.]+$/)] ),
      email:new FormControl('',[ Validators.required]),
      dob:new FormControl('',[ Validators.required]),
      gender:new FormControl('',[ Validators.required]),
      education:new FormControl('',[ Validators.required]),
      company:new FormControl('',[ Validators.required]),
      experience:new FormControl('',[ Validators.required]),
      package:new FormControl('',[ Validators.required]),
    })
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit():void {    
    if(this.empForm.valid) {
      if(this.data){
        this._empService.editEmployee(this.data.id ,this.empForm.value).subscribe({
          next:(val:any)=>{
            alert('Employee Update successfully');
            this._dialogRef.close(true);
  
          },
          error:(err:any) =>{
            alert('error');
          }
        })
        
      }else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next:(val:any)=>{
            alert('Employee added successfully');
            this._dialogRef.close(true);
  
          },
          error:(err:any) =>{
            alert('error');
          }
        })

      }


      
    }
  }
}
