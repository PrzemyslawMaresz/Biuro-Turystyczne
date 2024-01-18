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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


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
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { UpdateTripComponent } from './components/update-trip/update-trip.component';



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
    LoginComponent,
    RegistrationComponent,
    ManageUsersComponent,
    UpdateTripComponent,
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
    MatPaginatorModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
