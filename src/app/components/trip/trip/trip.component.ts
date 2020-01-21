import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  form: FormGroup;

  showTrips = false;
  isLoading = false;
  constructor(private formBuilder: FormBuilder) { }

  validate() {
    if (this.form.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.showTrips = true;
        this.isLoading = false;
      }, 3000);
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      twitterUsername: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      maxPrice: ['', Validators.required]
    });
  }

}
