import { Injectable } from '@angular/core';
import { Review } from '../models/reviews';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private reviewsCollection: AngularFirestoreCollection<Review>;
  private reviews: BehaviorSubject<Review[]>;

  constructor(private firestore: AngularFirestore) {

    this.reviewsCollection = firestore.collection<Review>('reviews');
    this.reviews = new BehaviorSubject<Review[]>([]);
    this.loadReviewsFromFirestore();

  }

  loadReviewsFromFirestore() {
    this.reviewsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => this.mapFirestoreData(a)))
    ).subscribe(reviews => {
      this.reviews.next(reviews);
    });
  }

  mapFirestoreData(action: DocumentChangeAction<Review>): Review {
    const data = action.payload.doc.data() as Review;
    data.id = action.payload.doc.id;
    return { ...data };
  }

  getReviews(): Observable<Review[]> {
    return this.reviews.asObservable();
  }

  async addReview(review: Review): Promise<any> {
    return this.reviewsCollection.add(review);
  }

  async updateReview(id: string, review: Review): Promise<any> {
    return this.reviewsCollection.doc(id).update(review);
  }

  async deleteReview(id: string): Promise<any> {
    return this.reviewsCollection.doc(id).delete();
  }
}
