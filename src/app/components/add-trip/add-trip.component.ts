import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trip } from '../../models/trip';
import { TripsService } from '../../services/trips.service';
import { Timestamp } from '@angular/fire/firestore';


@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {

  private tripForm: FormGroup;

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private TripsService: TripsService
    ) {
    this.tripForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      country: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*')]],
      maxSpots: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*')]],
      description: ['', Validators.required],
      imageLink: ['', Validators.required],
    });
  }

  addTrip() {
    if (this.tripForm.valid){
      const newTrip: Trip = this.tripForm.value;

      newTrip.reservedSpots = 0;
      newTrip.rate = 0;
      newTrip.numberOfRates = 0;

      this.TripsService.addTrip(newTrip).then(() => {
        this.router.navigate(['/trips']);
      }).catch((error) => {
        console.log('Błąd podczas dodawania wycieczki do bazy danych:', error);
      });
    } else {
      alert('Wypełnij wszystkie pola!')
    }
  }

}
