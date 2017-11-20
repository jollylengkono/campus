import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
import { CourseProvider } from '../../providers/course/course';


@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html'
})
export class CoursesPage {

  //private coursesRef: AngularFirestoreCollection<any>;
  private courses: Observable<any[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController, public authProvider: AuthProvider, private courseProvider: CourseProvider) {
    this.courses = this.courseProvider.getCoursesRef().snapshotChanges().map(changes => {
      return changes.map(c => {
        const data = c.payload.doc.data();
        const id = c.payload.doc.id;
        return { id, ...data }
      });
    });
  }

  addCourse() {
    let prompt = this.alertCtrl.create({
      title: 'Add Course',
      message: '',
      inputs: [
        {
          name: 'course_id',
          placeholder: 'Course ID'
        },
        {
          name: 'title',
          placeholder: 'Course Title'
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
            this.courseProvider.getCoursesRef().add({course_id: data.course_id, title: data.title});
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(docId, courseId, courseTitle) {
    let actionSheet  = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: 'Delete Course',
          role: 'destructive',
          handler: () => {
            this.courseProvider.getCoursesRef().doc(docId).delete();
          }
        },
        {
          text: 'Update Course',
          handler: () => {
            this.updateCourse(docId, courseId, courseTitle);
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

  updateCourse(docId, courseId, courseTitle) {
    let prompt = this.alertCtrl.create({
      title: 'Update Course',
      message: '',
      inputs: [
        {
          name: 'course_id',
          placeholder: 'Course ID',
          value: courseId
        },
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
            this.courseProvider.getCoursesRef().doc(docId).update({title: data.title});
          }
        }
      ]
    });
    prompt.present();
  }
}
