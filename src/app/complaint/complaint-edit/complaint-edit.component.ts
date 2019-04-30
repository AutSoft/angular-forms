import { Component, OnInit } from '@angular/core';
import { NewComplaint } from '../new-complaint';

@Component({
  selector: 'szia-complaint-edit',
  templateUrl: './complaint-edit.component.html',
  styleUrls: ['./complaint-edit.component.scss']
})
export class ComplaintEditComponent implements OnInit {
  complaint = new NewComplaint();
  urlValidationPattern =
    '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$';

  constructor() {}

  ngOnInit() {
    this.complaint.name = 'Teszt'
  }

}
