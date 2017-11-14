import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  coursesRef: AngularFirestoreCollection<any>;
  courses: Observable<any[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController, db: AngularFireDatabase, private afs: AngularFirestore, public authProvider: AuthProvider) {
    this.coursesRef = this.afs.collection<any>('courses');
    this.courses = this.coursesRef.snapshotChanges().map(changes => {
      return changes.map(c => {
        const data = c.payload.doc.data();
        const id = c.payload.doc.id;
        return { id, ...data }
      });
    });
  }

  addCourse() {
    let prompt = this.alertCtrl.create({
      title: '',
      message: "Enter Course name",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.coursesRef.add({title: data.title});
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(courseKey, courseTitle) {
    let actionSheet  = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Delete Course',
          role: 'destructive',
          handler: () => {
            this.coursesRef.doc(courseKey).delete();
          }
        },
        {
          text: 'Update Course',
          handler: () => {
            this.updateCourse(courseKey, courseTitle);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  updateCourse(courseKey, courseTitle) {
    let prompt = this.alertCtrl.create({
      title: '',
      message: 'Update Course',
      inputs: [
        {
          name: 'title',
          placeholder: 'Course Title',
          value: courseTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.coursesRef.doc(courseKey).update({title: data.title});
          }
        }
      ]
    });
    prompt.present();
  }

  logoutUser() {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    })
  }

}
