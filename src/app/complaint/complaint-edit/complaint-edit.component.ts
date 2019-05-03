import { Component, OnInit, ViewChild } from '@angular/core';
import { NewComplaint } from '../new-complaint';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ComplaintService } from '../complaint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HasComponentUnsavedChanges } from '../../core/can-deactivate-guard.service';

@Component({
  selector: 'szia-complaint-edit',
  templateUrl: './complaint-edit.component.html',
  styleUrls: ['./complaint-edit.component.scss']
})
export class ComplaintEditComponent implements OnInit, HasComponentUnsavedChanges {
  form: FormGroup;
  urlValidationPattern =
    '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$';
  isLoading = false;
  private isNew: boolean;
  private complaintId: number;

  constructor(
    private complaintService: ComplaintService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      name: [ undefined, Validators.required ],
      email: [ undefined, [ Validators.required, Validators.email ] ],
      phoneNumber: [ undefined ],
      subject: [ undefined, [ Validators.required, Validators.maxLength(30) ] ],
      content: [ undefined ],
      imageSource: [ undefined, Validators.pattern(this.urlValidationPattern) ]
    });
  }

  ngOnInit() {
    this.route.queryParams.pipe(switchMap((params) => {
      if (params['id']) {
        this.isNew = false;
        this.complaintId = +params['id'];
        return this.complaintService.getComplaint(this.complaintId);
      } else {
        this.isNew = true;
        return of(new NewComplaint());
      }
    })).subscribe(complaint => this.form.patchValue(complaint));
  }

  submitted() {
    this.isLoading = true;
    const action = this.isNew ?
      this.complaintService.saveComplaint(this.form.value) : this.complaintService.updateComplaint(this.complaintId, this.form.value);
    action.subscribe(() => {
      this.isLoading = false;
      this.snackBar.open('Complaint saved', 'OK');
      this.form.reset();
      if (!this.isNew) {
        this.router.navigate(['..'], {relativeTo: this.route});
      }
    }, () => this.isLoading = false);
  }

  hasUnsavedChanges(): boolean {
    return !this.form.pristine;
  }

}
