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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

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
  tripReviews: Review[] = [];
  reviewForm: FormGroup;
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripsService: TripsService,
    private currencyService: CurrencyService,
    private reviewsService: ReviewsService,
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private usersService: UsersService,
  ){
    this.reviewForm = this.fb.group({
      nick: ['', Validators.required],
      review: ['', [Validators.required, this.validateReview]]
    });
  }

  ngOnInit() {
    const tripId = this.route.snapshot.paramMap.get('id');
    this.tripsService.getTrips().subscribe((trips: Trip[]) => {
      const foundTrip = trips.find(trip => trip.id === tripId);
      if (foundTrip) {
        this.trip = foundTrip;
      } else {
        this.router.navigate(['/trips']);
      }
    });

    this.currencyService.getSelectedCurrency().subscribe((currency: string) => {
      this.selectedCurrency = currency;
    });

    this.reviewsService.getReviews().subscribe((reviews: Review[]) => {
      this.tripReviews = reviews.filter(review => review.tripId === tripId);
    });

    this.reservationService.getReservations().subscribe((reservations) => {
      this.tripReservations = reservations
      .filter(reservation => reservation.tripId === tripId && reservation.userId === this.user?.id);
      this.selectedRating = this.returnUserRate();
    });

    this.usersService.getUser().subscribe((user: User | null) => {
      this.user = user;
    });

    
  }

  rateTrip(rating: number) {
    if (!this.isTripRated()){
      const lastReservation = this.tripReservations[this.tripReservations.length - 1];
    lastReservation.userRate = rating;
    this.reservationService.updateReservation(lastReservation.id, lastReservation);
    this.selectedRating = rating;
    const newRate = (this.trip.rate * this.trip.numberOfRates + rating) / (this.trip.numberOfRates + 1);
    this.trip.rate = Math.round(newRate * 100) / 100;
    this.trip.numberOfRates++;
    this.tripsService.updateTrip(this.trip.id, {
      rate: this.trip.rate,
      numberOfRates: this.trip.numberOfRates,
    });
    }
  }


  addReview() {
    if (this.reviewForm.valid){
      const newReview: Review = this.reviewForm.value;
      newReview.tripId = this.trip.id;
      let date: string = "";
      if (this.user?.role === 'client') {
        date = this.tripReservations[this.tripReservations.length - 1].dateOfReservation;
      } else {
        date = new Date().toISOString().slice(0, 10);
      }
      newReview.date = date;
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

  reserveTrip(trip: Trip) {
    this.tripsService.reserveTrip(trip);
  }

  cancelReservation(trip: Trip) {
    this.tripsService.cancelReservation(trip);
  }

  deleteReview(review: Review) {
    this.reviewsService.deleteReview(review.id);
  }

  mapHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.trip.mapLink);
  }

  isCustomer(): boolean {
    return this.usersService.getRole() === 'client';
  }

  isModerator(): boolean {
    return this.usersService.getRole() === 'manager' || this.usersService.getRole() === 'admin';
  }

  isManager(): boolean {
    return this.usersService.getRole() === 'manager';
  }

  isAdmin(): boolean {
    return this.usersService.getRole() === 'admin';
  }

  isTripReserved(): boolean {
    return this.tripReservations.length > 0;
  }

  isTripRated(): boolean {
    return this.tripReservations[this.tripReservations.length - 1].userRate > 0;
  }

  returnUserRate(): number {
    return this.tripReservations[this.tripReservations.length - 1].userRate;
  }

  isUserBanned(): boolean {
    return this.user?.isBanned || false;
  }


}
