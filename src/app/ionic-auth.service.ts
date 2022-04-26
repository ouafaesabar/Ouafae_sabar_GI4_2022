import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from "@angular/fire/compat/firestore";


@Injectable({
  providedIn: 'root'
})

export class IonicAuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    public firestore: AngularFirestore,
  ) { }  

  createUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }
  saveDetails(data) {
    return this.firestore.collection("users").doc(data.uid).set(data);
  }

  signinUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err),
          )
    })
  }

  signoutUser() {
    return this.angularFireAuth.signOut().then(() => {
      console.log('Logged out!');
    });
  }

  userDetails() {
    return this.angularFireAuth.user
  }
  getDetails(uid : string) {
    return this.firestore.collection('users').doc(uid).valueChanges();
  }

}