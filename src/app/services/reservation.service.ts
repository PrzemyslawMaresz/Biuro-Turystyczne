import { Reservation } from './../models/reservation';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationsCollection: AngularFirestoreCollection<Reservation>;
  private reservations: BehaviorSubject<Reservation[]>;
  private updateStatusInterval: any;
  

  constructor(private fireStore: AngularFirestore) {
    this.reservationsCollection = fireStore.collection<Reservation>('reservations');
    this.reservations = new BehaviorSubject<Reservation[]>([]);
    this.loadReservationsFromFirestore();
    this.setUpdateStatusInterval(6000);
  }


  private loadReservationsFromFirestore() {
    this.reservationsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => this.mapFirestoreData(a)))
    ).subscribe(reservations => {
      this.reservations.next(reservations);
      this.updateStatus();
    });
  }

  mapFirestoreData(action: DocumentChangeAction<Reservation>): Reservation {
    const data = action.payload.doc.data() as Reservation;
    data.id = action.payload.doc.id;
    return { ...data };
  }

  getReservations(): Observable<Reservation[]> {
    return this.reservations.asObservable();
  }

  async addReservation(reservation: Reservation): Promise<any> {
    const { status, ...reservationData } = reservation;
    return this.reservationsCollection.add(reservationData)
  }

  updateReservation(id: string | undefined, reservation: Reservation): Promise<any> {
    const { status, ...reservationData } = reservation;
    return this.reservationsCollection.doc(id).update(reservationData);
  }

  updateStatus() {
    const currentDate = new Date();
    this.reservations.getValue().forEach(reservation => {
      const startDate = new Date(reservation.startDate);
      const endDate = new Date(reservation.endDate);

      if (currentDate < startDate) {
        reservation.status = 'pending';
      } else if (currentDate > endDate) {
        reservation.status = 'finished';
      } else {
        reservation.status = 'active';
      }
      reservation.isTripUpcoming = Math.abs(startDate.getTime() - currentDate.getTime()) < (3 * 24 * 60 * 60 * 1000);
    });

    this.reservations.next(this.reservations.getValue());
  }

  private setUpdateStatusInterval(interval: number) {
    this.updateStatusInterval = setInterval(() => {
      this.updateStatus();
    }, interval);
  }
  
  ngOnDestroy() {
    clearInterval(this.updateStatusInterval);
  }



}
