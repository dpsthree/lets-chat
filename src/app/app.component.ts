import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'dps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  chatMessages: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.chatMessages = db.collection('chatMessages').valueChanges();
  }

}
