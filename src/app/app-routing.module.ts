import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsComponent } from './components/trips/trips.component';
import { HomeComponent } from './components/home/home.component';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { CartComponent } from './components/cart/cart.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { UpdateTripComponent } from './components/update-trip/update-trip.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'trips', component: TripsComponent},
  {path: 'add-trip', component: AddTripComponent},
  {path: 'cart', component: CartComponent},
  {path: 'purchase-history', component: PurchaseHistoryComponent},
  {path: 'trip-details/:id', component: TripDetailsComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'manage-users', component: ManageUsersComponent},
  {path: 'update-trip/:id', component: UpdateTripComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
