import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-add-associate',
  templateUrl: './add-associate.component.html',
  styleUrls: ['./add-associate.component.css']
})
export class AddAssociateComponent implements OnInit {

  constructor(private builder: FormBuilder){}


  ngOnInit(): void {
    
  }

  title = "Create Associate";

  associateForm = this.builder.group({
    id : this.builder.control(0),
    name : this.builder.control('', Validators.required),
    email : this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone : this.builder.control('', Validators.required),
    address : this.builder.control('', Validators.required),
    type : this.builder.control('Customer'),
    group : this.builder.control('level_1'),
    status : this.builder.control(true)
  });



  saveAssociate(){
    if(this.associateForm.valid){

    }
  }

}
