import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsComponent } from './components/trips/trips.component';
import { HomeComponent } from './components/home/home.component';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { CartComponent } from './components/cart/cart.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'trips', component: TripsComponent},
  {path: 'add-trip', component: AddTripComponent},
  {path: 'cart', component: CartComponent},
  {path: 'purchase-history', component: PurchaseHistoryComponent},
  {path: 'trip-details/:id', component: TripDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
