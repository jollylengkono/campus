import { Component } from '@angular/core';
import { IonicPage, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CourseProvider } from '../../providers/course/course';

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

  private studentCourses: Observable<any[]>;

  constructor(private actionSheetCtrl: ActionSheetController, private courseProvider: CourseProvider) {
    this.studentCourses = this.courseProvider.studentCoursesRef().snapshotChanges().map(changes => {
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
            this.courseProvider.studentCoursesRef().doc(studentCourseId).delete();
            this.courseProvider.disenroll(courseName);
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
