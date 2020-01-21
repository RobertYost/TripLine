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

  trips = [{
    region: 'French Polynesia',
    img: 'assets/frenchpoly.jpg',
    description: 'The last few years have been challenging for you, but also empowering — and you’re ready to make some big changes in 2020. You’ve overcome a lot of obstacles and have a clear vision of what you want. Kicking off the year with a wellness retreat will be just what the doctor ordered.',
    flights: [],
    stops: [
      {
        location: 'Bora Bora'
      },
      {
        locaiton: 'Tahiti'
      },
      {
        location: 'Ta Ha\'a'
      }
    ]
  },
  {
    region: 'Taiwan',
    img: 'assets/taiwain.jpg',
    description: 'You’ve been very independent from a young age, and get a thrill out of making decisions and plans for yourself. When you travel with a close group of friends, they know they can count on you for handling the itinerary and all the reservations. When push comes to shove, though, you’d rather just do a solo trip. We think it’s about time you head to Taiwan.',
    flights: [],
    stops: [
      {
        location: 'Taipei'
      },
      {
        locaiton: 'Sun Moon Lake'
      },
      {
        location: 'Taichung City'
      }
    ]
  }
  ];
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
