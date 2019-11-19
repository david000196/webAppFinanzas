import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { auth, User } from 'firebase/app'
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore'

import {Observable, of} from 'rxjs'
import {switchMap} from 'rxjs/operators'
import {Usuario} from '../models/usuario/usuario'
import { AngularFireModule } from '@angular/fire';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
user$: Observable<Usuario>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if  (user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }
  async googleSignin(){
    const provider = new auth.GoogleAuthProvider();
    const credential =  await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }
  async signout(){
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }
  private updateUserData(user){
    const userRef: AngularFirestoreDocument<Usuario> = this.afs.doc(`users/${user.uid}`);
  }
}
