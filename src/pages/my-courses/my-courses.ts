import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController } from 'ionic-angular';
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

  studentCoursesRef: AngularFirestoreCollection<any>;
  studentCourses: Observable<any[]>; //Expecting single record

  constructor(public navCtrl: NavController, private afs: AngularFirestore, private afAuth: AngularFireAuth, public actionSheetCtrl: ActionSheetController) {
    this.studentCoursesRef = this.afs.collection<any>('student_courses', ref => ref.where('student_email', '==', afAuth.auth.currentUser.email));
    this.studentCourses = this.studentCoursesRef.snapshotChanges().map(changes => {
      return changes.map(c => {
        const data = c.payload.doc.data();
        const id = c.payload.doc.id;
        return { id, ...data }
      });
    });
  }

  showOptions(studentCourseId, courseName) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Delete ' + courseName,
          role: 'destructive',
          handler: () => {
            this.studentCoursesRef.doc(studentCourseId).delete();
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

  enroll(courseName) {
    this.studentCoursesRef.add({course_name: courseName, student_email: this.afAuth.auth.currentUser.email});
  }
}
