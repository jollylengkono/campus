import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the CourseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CourseProvider {

  private studentCoursesRef: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
  }

  public getStudentCoursesRef(): AngularFirestoreCollection<any> {
    this.studentCoursesRef = this.afs.collection<any>('student_courses', ref => ref.where('student_email', '==', this.afAuth.auth.currentUser.email));
    return this.studentCoursesRef;
  }

  public enroll(courseName) {
    this.studentCoursesRef.add({course_name: courseName, student_email: this.afAuth.auth.currentUser.email});
  }

}
