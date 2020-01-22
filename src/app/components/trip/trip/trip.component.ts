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
    expanded: false,
    total_price: '$8,350',
    img: 'assets/frenchpoly.jpg',
    description: 'The last few years have been challenging for you, but also empowering — and you’re ready to make some big changes in 2020. You’ve overcome a lot of obstacles and have a clear vision of what you want. Kicking off the year with a wellness retreat will be just what the doctor ordered.',
    flights: [
      {
        route: 'Columbus - Bora Bora',
        takeoff_time: '5:43pm',
        landing_time: '12:30pm',
        price: '$743.75'
      },
      {
        route: 'Bora Bora - Tahiti',
        takeoff_time: '5:43pm',
        landing_time: '6:15pm',
        price: '$243.00'
      },
      {
        route: 'Tahiti - Ta Ha\'a',
        takeoff_time: '5:43pm',
        landing_time: '12:30pm',
        price: '$137.75'
      },
      {
        route: 'Ta Ha\'a - Columbus',
        takeoff_time: '5:43pm',
        landing_time: '12:30pm',
        price: '$648.75'
      }
    ],
    stops: [
      {
        location: 'Bora Bora',
        arrival_date: '02/04/2020',
        hotel_cost: '$499.90 per night',
        food_cost: '$185.00 per day '
      },
      {
        location: 'Tahiti',
        arrival_date: '02/9/2020',
        hotel_cost: '$799.00 per night',
        food_cost: '$199.00 per day'
      },
      {
        location: 'Ta Ha\'a',
        arrival_date: '02/11/2020',
        hotel_cost: '$899.00 per night',
        food_cost: '$265.00 per day'
      }
    ]
  },
  {
    region: 'Taiwan',
    expanded: false,
    total_price: '$2,025',
    img: 'assets/taiwain.jpg',
    description: 'You’ve been very independent from a young age, and get a thrill out of making decisions and plans for yourself. When you travel with a close group of friends, they know they can count on you for handling the itinerary and all the reservations. When push comes to shove, though, you’d rather just do a solo trip. We think it’s about time you head to Taiwan.',
    flights: [],
    stops: [
      {
        location: 'Taipei',
        arrival_date: '02/04/2020',
        hotel_cost: '$49.00 per night',
        food_cost: '$7.00 per day'
      },
      {
        location: 'Sun Moon Lake',
        arrival_date: '02/09/2020',
        hotel_cost: '$79.00 per night',
        food_cost: '$9.00 per day'
      },
      {
        location: 'Taichung City',
        arrival_date: '02/11/2020',
        hotel_cost: '$65.00 per night',
        food_cost: '$6.50 per day'
      }
    ]
  }
  ];
  selectedTrip = this.trips[0];
  showSelectedTrip = false;

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
