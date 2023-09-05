import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AssociateService } from 'src/app/service/associate.service';
import {
  addAssociate,
  addAssociateSuccess,
  editAssociate,
  editAssociateSuccess,
  loadAssociate,
  loadAssociateFail,
  loadAssociateSuccess,
  updateAssociate,
  updateAssociateSuccess,
} from './associate.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { showAlert } from '../common/app.action';

@Injectable()
export class AssociateEffects {
  constructor(
    private actions: Actions,
    private associateService: AssociateService
  ) {}

  _loadAssociate = createEffect(() =>
    this.actions.pipe(
      ofType(loadAssociate),
      exhaustMap((action) => {
        return this.associateService.getAll().pipe(
          map((data) => {
            return loadAssociateSuccess({ list: data });
          }),
          catchError((_error) =>
            of(loadAssociateFail({ errorMessage: _error.message }))
          )
        );
      })
    )
  );

  _addAssociate = createEffect(() =>
    this.actions.pipe(
      ofType(addAssociate),
      switchMap((action) => {
        return this.associateService.create(action.inputData).pipe(
          switchMap((data) => {
            return of(
              addAssociateSuccess({ inputData: action.inputData }),
              showAlert({ message: 'Created successfully', resultType: 'pass' })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to create associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _updateAssociate = createEffect(() =>
    this.actions.pipe(
      ofType(updateAssociate),
      exhaustMap((action) => {
        return this.associateService.getById(action.id).pipe(
          map((data) => {
            return updateAssociateSuccess({ object: data });
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to fetch data' + _error.message,
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _editAssociate = createEffect(() =>
    this.actions.pipe(
      ofType(editAssociate),
      switchMap((action) => {
        return this.associateService.update(action.inputData).pipe(
          switchMap((data) => {
            return of(
              editAssociateSuccess({ inputData: action.inputData }),
              showAlert({ message: 'Updated successfully', resultType: 'pass' })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to update associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );
}
