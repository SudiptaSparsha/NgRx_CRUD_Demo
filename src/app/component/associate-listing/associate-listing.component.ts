import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAssociateComponent } from '../add-associate/add-associate.component';
import { Store } from '@ngrx/store';
import { Associates } from 'src/app/store/model/associate.model';
import { getAssociateList } from 'src/app/store/associate/associate.selectors';
import { loadAssociate } from 'src/app/store/associate/associate.action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-associate-listing',
  templateUrl: './associate-listing.component.html',
  styleUrls: ['./associate-listing.component.css'],
})
export class AssociateListingComponent implements OnInit {
  FunctionDelete(arg0: any) {
    throw new Error('Method not implemented.');
  }
  FunctionEdit(arg0: any) {
    throw new Error('Method not implemented.');
  }

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

  openPopup(code: number, title: string) {
    this.dialog.open(AddAssociateComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: code,
        title: title,
      },
    });
  }
}
