import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trip } from '../../models/trip';
import { TripsService } from '../../services/trips.service';


@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {

  tripForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private TripsService: TripsService
  ) {
    this.tripForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]*')]],
      country: ['', [Validators.required, Validators.pattern('[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]*')]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*')]],
      maxSpots: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*')]],
      description: ['', Validators.required],
      imageLink: ['', Validators.required],
      firstCaruselImageLink: [''],
      secondCaruselImageLink: [''],
      thirdCaruselImageLink: [''],
      mapLink: [''],
    });
  }

  addTrip() {
    for (const controlName in this.tripForm.controls) {
      const control = this.tripForm.get(controlName);
  
      if (control) {
        console.log(`${controlName} status:`, control.status);
      } else {
        console.error(`Control with name ${controlName} not found.`);
      }
    }
    if (this.tripForm.valid) {
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
      console.log('Invalid form fields:', this.tripForm.errors);
      alert('Formularz jest wypełniony niepoprawnie!')
    }
  }

}
