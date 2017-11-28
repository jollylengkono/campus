import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the CourseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CourseProvider implements OnDestroy {

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {    
  }

  coursesRef() {    
    return this.afs.collection<any>('courses');
  }

  studentCoursesRef() {
    return this.afs.collection<any>('student_courses', ref => ref.where('student_email', '==', this.afAuth.auth.currentUser.email));
  }

  availCoursesRef() {
    return this.afs.collection<any>('available_courses', ref => ref.where('student_email', '==', this.afAuth.auth.currentUser.email));
  }

  enroll(courseName) {
    this.studentCoursesRef().add({course_name: courseName, student_email: this.afAuth.auth.currentUser.email});
  }

  disenroll(courseTitle) {
    this.availCoursesRef().add({course_title: courseTitle, student_email: this.afAuth.auth.currentUser.email});
  }

  ngOnDestroy(): void {

  }
}
