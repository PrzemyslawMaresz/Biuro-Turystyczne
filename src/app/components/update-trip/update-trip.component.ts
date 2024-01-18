import { Component, OnInit } from '@angular/core';
import { Trip, defaultTrip } from '../../models/trip';
import { TripsService } from '../../services/trips.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-trip',
  templateUrl: './update-trip.component.html',
  styleUrls: ['./update-trip.component.css']
})
export class UpdateTripComponent implements OnInit {

  updateTripForm!: FormGroup;
  trip: Trip = defaultTrip;

  constructor(
    private tripsService: TripsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    const tripId = this.route.snapshot.paramMap.get('id');
    this.tripsService.getTrips().subscribe((trips: Trip[]) => {
      const foundTrip = trips.find(trip => trip.id === tripId);
      if (foundTrip) {
        this.trip = foundTrip;
        this.initializeForm(this.trip);
      } else {
        this.router.navigate(['/trips']);
      }
    });
  }

  initializeForm(initialValues: Trip) {
    this.updateTripForm = this.fb.group({
      name: [initialValues.name, [Validators.required, Validators.pattern('[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]*')]],
      country: [initialValues.country, [Validators.required, Validators.pattern('[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]*')]],
      startDate: [initialValues.startDate, Validators.required],
      endDate: [initialValues.endDate, Validators.required],
      price: [initialValues.price, [Validators.required, Validators.pattern('^[1-9][0-9]*')]],
      maxSpots: [initialValues.maxSpots, [Validators.required, Validators.pattern('^[1-9][0-9]*')]],
      description: [initialValues.description, Validators.required],
      imageLink: [initialValues.imageLink, Validators.required],
      firstCaruselImageLink: [initialValues.firstCaruselImageLink],
      secondCaruselImageLink: [initialValues.secondCaruselImageLink],
      thirdCaruselImageLink: [initialValues.thirdCaruselImageLink],
      mapLink: [initialValues.mapLink],
    });
  }

  updateTrip() {
    if (this.updateTripForm.valid) {
      const tripId = this.route.snapshot.paramMap.get('id');
      this.tripsService.updateTrip(tripId!, this.updateTripForm.value).then(() => {
        this.router.navigate(['/trips']);
      });
    } else {
      alert('Formularz zawiera błędy');
    }
  }
}
