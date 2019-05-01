import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintRoutingModule } from './complaint-routing.module';
import { ComplaintComponent } from './complaint/complaint.component';
import { ComplaintListComponent } from './complaint-list/complaint-list.component';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintEditComponent } from './complaint-edit/complaint-edit.component';

@NgModule({
  declarations: [ComplaintComponent, ComplaintListComponent, ComplaintEditComponent],
  imports: [
    CommonModule,
    ComplaintRoutingModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class ComplaintModule {}
