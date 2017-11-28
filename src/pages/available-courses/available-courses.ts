import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CourseProvider } from '../../providers/course/course';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the AvailableCoursesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-available-courses',
  templateUrl: 'available-courses.html',
})
export class AvailableCoursesPage implements OnDestroy {
  
  private availCourses: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private courseProvider: CourseProvider, private afAuth: AngularFireAuth) {
    this.availCourses = this.courseProvider.availCoursesRef().snapshotChanges().map(changes => {
      return changes.map(c => {
        const data = c.payload.doc.data();
        const id = c.payload.doc.id;
        return { id, ...data }
      });
    });
  }

  /**
   * Not used for now
   */
  generateAvailableCourses() {
    var courses = this.courseProvider.coursesRef().snapshotChanges().map(changes => {
      return changes.map(c => {
        const data = c.payload.doc.data();
        const id = c.payload.doc.id;
        return { id, ...data }
      });
    });

    courses.subscribe(course => {
      course.map((value, index) => {
        this.courseProvider.availCoursesRef().add({student_email: this.afAuth.auth.currentUser.email, course_title: value['title']});
      });
    });
  }

  enroll(availCourseId, courseName) {
    this.courseProvider.availCoursesRef().doc(availCourseId).delete();
    this.courseProvider.enroll(courseName);
  }

  ngOnDestroy(): void {

  }
}
