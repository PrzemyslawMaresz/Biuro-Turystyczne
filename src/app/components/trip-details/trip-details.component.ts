import { Trip, defaultTrip } from './../../models/trip';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from '../../services/trips.service';
import { CurrencyService } from '../../services/currency.service';
import { Review } from '../../models/reviews';
import { ReviewsService } from '../../services/reviews.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.css'
})
export class TripDetailsComponent {

  trip: Trip = defaultTrip;
  tripReservations: Reservation[] = [];
  selectedCurrency: string = 'PLN';
  selectedRating: number = 0;
  displayedRating: number = 0;
  tripReviews: Review[] = [];
  private reviewForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripsService: TripsService,
    private currencyService: CurrencyService,
    private reviewsService: ReviewsService,
    private reservationService: ReservationService,
    private fb: FormBuilder
  ){
    this.reviewForm = this.fb.group({
      nick: ['', Validators.required],
      review: ['', [Validators.required, this.validateReview]],
      date: ['', Validators.required],
    });
  }

  ngOnInit() {
    const tripId = this.route.snapshot.paramMap.get('id');
    this.tripsService.getTrips().subscribe((trips: Trip[]) => {
      const foundTrip = trips.find(trip => trip.id === tripId);
      if (foundTrip) {
        this.trip = foundTrip;
      } else {
        alert(`Wycieczka o ID ${tripId} nie została znaleziona.`)
        this.router.navigate(['/trips']);
      }
      if (this.selectedRating === 0){
        this.displayedRating = this.trip.rate;
      } else {
        this.displayedRating = this.selectedRating;
      }
    });

    this.currencyService.getSelectedCurrency().subscribe((currency: string) => {
      this.selectedCurrency = currency;
    });

    this.reviewsService.getReviews().subscribe((reviews: Review[]) => {
      this.tripReviews = reviews.filter(review => review.tripId === tripId);
    });

    this.reservationService.getReservations().subscribe((reservations) => {
      this.tripReservations = reservations.filter(reservation => reservation.tripId === tripId);
    });
  }

  rateTrip(rating: number) {
    this.selectedRating = rating;
    this.displayedRating = rating;
    const newRate = (this.trip.rate * this.trip.numberOfRates + rating) / (this.trip.numberOfRates + 1);
    this.trip.rate = Math.round(newRate * 100) / 100;
    this.trip.numberOfRates++;
    this.tripsService.updateTrip(this.trip.id, {
      rate: this.trip.rate,
      numberOfRates: this.trip.numberOfRates,
    });
  }


  addReview() {
    if (this.reviewForm.valid){
      const newReview: Review = this.reviewForm.value;
      newReview.tripId = this.trip.id;
      const purchaseDate = this.tripReservations[0].dateOfReservation;
      newReview.date = purchaseDate;
      this.reviewsService.addReview(newReview).then(() => {
        this.reviewForm.reset();
      }).catch((error) => {
        console.log('Błąd podczas dodawania recenzji do bazy danych:', error);
      });
    } else {
      alert('Wypełnij wszystkie pola!')
    }
  }

  validateReview(control: AbstractControl): ValidationErrors | null {
    const reviewText = control.value as string;

    if (!reviewText) {
      return { required: true };
    }

    if (reviewText.length < 50 || reviewText.length > 500) {
      return { invalidLength: true };
    }

    return null;
  }




}
