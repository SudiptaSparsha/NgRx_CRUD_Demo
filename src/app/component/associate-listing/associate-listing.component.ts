import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAssociateComponent } from '../add-associate/add-associate.component';
import { Store } from '@ngrx/store';
import { Associates } from 'src/app/store/model/associate.model';
import { getAssociateList } from 'src/app/store/associate/associate.selectors';
import { deleteAssociate, loadAssociate, openPopup, updateAssociate } from 'src/app/store/associate/associate.action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-associate-listing',
  templateUrl: './associate-listing.component.html',
  styleUrls: ['./associate-listing.component.css'],
})
export class AssociateListingComponent implements OnInit {
  
  associateList!: Associates[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'address',
    'type',
    'group',
    'status',
    'action',
  ];

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadAssociate());

    this.store.select(getAssociateList).subscribe((data) => {
      this.associateList = data;
      this.dataSource = new MatTableDataSource<Associates>(this.associateList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      console.log(this.associateList);
    });
  }

  functionAdd() {
    this.openPopup(0, 'Create Associate');
  }

  
  functionDelete(id : number) {
    if(confirm('Do you want to remove this associate?')){
      this.store.dispatch(deleteAssociate({id: id}))
    }
  }


  // FunctionEdit(code:number){
  //   this.openPopup(code, 'Update Associate');
  //   this.store.dispatch(updateAssociate({id:code}))
  // }


  functionEdit(id : number) {
    this.openPopup(id, 'Update Associate');
    this.store.dispatch(updateAssociate({id: id}))
  }


  openPopup(code: number, title: string) {
    this.store.dispatch(openPopup())
    this.dialog.open(AddAssociateComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
      data: {
        code: code,
        title: title,
      },
    });
  }
}
