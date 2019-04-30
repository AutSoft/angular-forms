import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ConfirmDialogComponent, ConfirmDialogData } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

export interface HasComponentUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<HasComponentUnsavedChanges> {

  constructor(private dialogService: MatDialog) { }

  canDeactivate(component: HasComponentUnsavedChanges): Observable<boolean> | boolean {
    if (!component.hasUnsavedChanges()) {
      return true;
    }
    const data: ConfirmDialogData = {question: 'Your unsaved changes will be lost Are you sure you want to navigate?'};
    return this.dialogService.open(ConfirmDialogComponent, { data }).afterClosed();
  }
}
