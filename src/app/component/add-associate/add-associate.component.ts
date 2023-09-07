import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, Validators} from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addAssociate, editAssociate } from 'src/app/store/associate/associate.action';
import { updateAssociate } from 'src/app/store/associate/associate.selectors';
import { Associates } from 'src/app/store/model/associate.model';

@Component({
  selector: 'app-add-associate',
  templateUrl: './add-associate.component.html',
  styleUrls: ['./add-associate.component.css']
})
export class AddAssociateComponent implements OnInit {
  
  title = "Create Associate";
  isEdit = false;
  dialogData : any;

  constructor(private builder: FormBuilder,
              private ref : MatDialogRef<AddAssociateComponent>,
              @Inject(MAT_DIALOG_DATA) public data : any,
              private store : Store){}


  ngOnInit(): void {
    this.dialogData = this.data;
    this.title = this.dialogData.title;
    this.store.select(updateAssociate).subscribe(response => {
      this.associateForm.setValue({
        id: response.id,
        name: response.name,
        email: response.email,
        phone: response.phone,
        address: response.address,
        type: response.type,
        associateGroup: response.associateGroup,
        status: response.status
      })
    })
  }

  closePopup(){
    this.ref.close();
  }

  associateForm = this.builder.group({
    id : this.builder.control(0),
    name : this.builder.control('', Validators.required),
    email : this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone : this.builder.control('', Validators.required),
    address : this.builder.control('', Validators.required),
    type : this.builder.control('Customer'),
    associateGroup : this.builder.control('level_1'),
    status : this.builder.control(true)
  });



  saveAssociate(){
    if(this.associateForm.valid){
      const _obj : Associates ={
        id: this.associateForm.value.id as number,
        name: this.associateForm.value.name as string,
        email: this.associateForm.value.email as string,
        phone: this.associateForm.value.phone as string,
        type: this.associateForm.value.type as string,
        address: this.associateForm.value.address as string,
        associateGroup: this.associateForm.value.associateGroup as string,
        status: this.associateForm.value.status as boolean
      }
      console.log(this.associateForm.value);

      if(_obj.id === 0){
        this.store.dispatch(addAssociate({inputData : _obj}))
      }else{
        this.store.dispatch(editAssociate({inputData : _obj}))
      }

      this.closePopup();

    }
  }

}
