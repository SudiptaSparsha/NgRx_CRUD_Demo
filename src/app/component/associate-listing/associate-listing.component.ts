import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-associate-listing',
  templateUrl: './associate-listing.component.html',
  styleUrls: ['./associate-listing.component.css']
})
export class AssociateListingComponent implements OnInit {

  constructor(private dialog: MatDialog){}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  functionAdd(){

  }

}
