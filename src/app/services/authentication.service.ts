import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: Observable<firebase.User | null>;
  private isLogged = false;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    ) {
    this.userData = angularFireAuth.authState;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isLogged) {
          this.signOut();
          this.router.navigate(['/home']);
        }
      }
    });
  }

  async signUp(email: string, password: string){

    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
    return userCredential;
    
  }

  async signIn(email: string, password: string){
    const userCredential = await this.angularFireAuth.signInWithEmailAndPassword(email, password);
    if (userCredential.user) {
    }
    this.isLogged = true;
    this.router.navigate(['/trips']);
    return userCredential;
  }

  signOut() {
    this.angularFireAuth.signOut();
    this.isLogged = false;
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }

}
