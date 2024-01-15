import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip, TripData } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private tripsCollection: AngularFirestoreCollection<TripData>;
  private trips: BehaviorSubject<Trip[]>;

  constructor(private firestore: AngularFirestore) {
    this.tripsCollection = firestore.collection<TripData>('trips');
    this.trips = new BehaviorSubject<Trip[]>([]); 
    this.loadTripsFromFirestore();
  }

  private loadTripsFromFirestore(){
    this.tripsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => this.mapFirestoreData(a)))
    ).subscribe(trips => {
      this.trips.next(trips);
    });
  }

  private mapFirestoreData(action: DocumentChangeAction<TripData>): Trip{
    const data = action.payload.doc.data() as TripData;
    data.id = action.payload.doc.id;
    const trip: Trip = {
      ...data,
      selectedSpots: 0,
      availableSpots: data.maxSpots - data.reservedSpots,
      isChecked: true
    };
    return trip;
  }

  getTrips(): Observable<Trip[]> {
    return this.trips.asObservable();
  }

  async addTrip(trip: Trip): Promise<any> {
    const tripData: TripData = { ...trip };
    return this.tripsCollection.add(tripData)
  }

  updateTrip(tripId: string, changes: Partial<TripData>): Promise<any> {
    return this.tripsCollection.doc(tripId).update(changes);
  }

  deleteTrip(tripId: string): Promise<any> {
    return this.tripsCollection.doc(tripId).delete();
  }

  reserveTrip(trip: Trip) {
    if (trip.availableSpots > 0) {
      trip.selectedSpots++;
      trip.availableSpots--;
      this.trips.next(this.trips.getValue());
    }
  }

  cancelReservation(trip: Trip) {
    if (trip.selectedSpots > 0) {
      trip.selectedSpots--;
      trip.availableSpots++;
      this.trips.next(this.trips.getValue());
    }
  }

  updateTripsList(trips: Trip[]) {
    this.trips.next(trips);
  }

}
