import { Component, OnInit, ViewChild } from '@angular/core';
import { NewComplaint } from '../new-complaint';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ComplaintService } from '../complaint.service';

@Component({
  selector: 'szia-complaint-edit',
  templateUrl: './complaint-edit.component.html',
  styleUrls: ['./complaint-edit.component.scss']
})
export class ComplaintEditComponent implements OnInit {
  complaint = new NewComplaint();
  urlValidationPattern =
    '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$';
  @ViewChild('form') private form: NgForm;

  constructor(private complaintService: ComplaintService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.complaint.name = 'Teszt';
  }

  submitted() {
    this.complaintService.saveComplaint(this.complaint).subscribe(() => {
      this.snackBar.open('Complaint saved', 'OK');
      this.complaint = new NewComplaint();
      this.form.resetForm();
    });
  }

}
