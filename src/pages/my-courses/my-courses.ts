import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the MyCoursesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-courses',
  templateUrl: 'my-courses.html',
})
export class MyCoursesPage {

  myCoursesRef: AngularFirestoreCollection<any>;
  myCourses: Observable<any[]>;
  private courses: any[];

  constructor(public navCtrl: NavController, private afs: AngularFirestore, afAuth: AngularFireAuth, public actionSheetCtrl: ActionSheetController) {
    this.myCoursesRef = this.afs.collection<any>('student_courses', ref => ref.where('student_email', '==', afAuth.auth.currentUser.email));
    this.myCourses = this.myCoursesRef.snapshotChanges().map(changes => {
      return changes.map(c => {
        const data = c.payload.doc.data();
        const id = c.payload.doc.id;
        return { id, ...data }
      });
    });

    this.myCourses.subscribe(data => {
      data.map((value, index) => {
        this.courses = value['courses'];
      });
    });
  }

  showOptions(myCourseId, course_name) {
    let actionSheet  = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Delete ' + course_name,
          role: 'destructive',
          handler: () => {
            this.courses.splice(this.courses.indexOf(course_name), 1);
            this.myCoursesRef.doc(myCourseId).update({courses: this.courses});
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

}
