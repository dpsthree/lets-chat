import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { User } from '@firebase/auth-types';

@Component({
  selector: 'dps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  chatMessages: Observable<any[]>;
  user: User;
  credentials = {
    email: '',
    password: '',
    displayName: ''
  };
  newAccount = true;


  constructor(private db: AngularFirestore, private afa: AngularFireAuth) {

    this.chatMessages = db.collection('chatMessages', col => col.orderBy('time')).
      valueChanges();
    this.afa.user.subscribe(user => this.user = user);

  }

  sendMessage(input: HTMLInputElement) {
    this.db.collection('chatMessages').add({
      from: 'Paul',
      message: input.value,
      time: Date.now()
    }).then(() => {
      input.value = '';
    });
  }

  createUser() {
    this.afa.auth.createUserAndRetrieveDataWithEmailAndPassword(this.credentials.email, this.credentials.password)
      .then(auth => auth.user.updateProfile({
        displayName: this.credentials.displayName,
        photoURL: ''
      }));
  }

  logout() {
    this.afa.auth.signOut();
  }

  login() {
    this.afa.auth.signInAndRetrieveDataWithEmailAndPassword(this.credentials.email, this.credentials.password);
  }


}
