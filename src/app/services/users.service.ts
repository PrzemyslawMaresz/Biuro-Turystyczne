import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersCollection: AngularFirestoreCollection<User>;
  private users: BehaviorSubject<User[]>;
  private loggedUser: BehaviorSubject<User | null>;


  constructor(
    private firestore: AngularFirestore,
  ) {

    this.usersCollection = firestore.collection<User>('users');
    this.users = new BehaviorSubject<User[]>([]);
    this.loggedUser = new BehaviorSubject<User | null>(null);
    this.loadUsersData();
  }

  loadUsersData() {
    this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => this.mapFirestoreData(a)))
    ).subscribe(users => {
      this.users.next(users);
      this.loadUserData(this.loggedUser.value?.uid)
    });
  }

  loadUserData(uid: string | undefined) {
    this.loggedUser.next(this.users.value.find(user => user.uid === uid) || null);
  }

  mapFirestoreData(action: DocumentChangeAction<User>): User {
    const data = action.payload.doc.data() as User;
    data.id = action.payload.doc.id;
    return { ...data };
  }


  getUser(): Observable<User | null> {
    return this.loggedUser.asObservable();
  }

  getUsers(): Observable<User[]> {
    return this.users.asObservable();
  }

  async addUser(user: User): Promise<any> {
    return this.usersCollection.add(user);
  }

  async updateUser(id: string | undefined, user: User): Promise<any> {
    return this.usersCollection.doc(id).update(user);
  }

  async deleteUser(id: string | undefined): Promise<any> {
    return this.usersCollection.doc(id).delete();
  }

  getRole(): string {
    if (this.loggedUser.value) {
      return this.loggedUser.value.role;
    } else {
      return "guest";
    }
    
  }

  getName(): string {
    if (this.loggedUser.value) {
      return this.loggedUser.value.username;
    } else {
      return "";
    }
  }
  
}
