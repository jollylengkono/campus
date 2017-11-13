import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  coursesRef: AngularFireList<any>;
  courses: Observable<any[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController, db: AngularFireDatabase, public authProvider: AuthProvider) {
    this.coursesRef = db.list('courses');
    this.courses = this.coursesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
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
            this.coursesRef.push({title: data.title});
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
            this.coursesRef.remove(courseKey);
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
            this.coursesRef.update(courseKey, {title: data.title});
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
