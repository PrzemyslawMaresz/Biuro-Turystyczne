import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TripsComponent } from './components/trips/trips.component';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { ReservationSummaryComponent } from './components/reservation-summary/reservation-summary.component';
import { CurrencyConventerPipe } from './pipes/currency-conventer.pipe';
import { CartComponent } from './components/cart/cart.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { FilterComponent } from './components/filter/filter.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TripsComponent,
    AddTripComponent,
    ReservationSummaryComponent,
    CurrencyConventerPipe,
    CartComponent,
    PurchaseHistoryComponent,
    FilterComponent,
    TripDetailsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
