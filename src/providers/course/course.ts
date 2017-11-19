import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the CourseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CourseProvider {

  private studentCoursesRef: AngularFirestoreCollection<any>;
  private availCoursesRef: AngularFirestoreCollection<any>;
  private coursesRef: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
  }

  public getCoursesRef() {
    this.coursesRef = this.afs.collection<any>('courses');
    return this.coursesRef;
  }

  public getStudentCoursesRef(): AngularFirestoreCollection<any> {
    this.studentCoursesRef = this.afs.collection<any>('student_courses', ref => ref.where('student_email', '==', this.afAuth.auth.currentUser.email));
    return this.studentCoursesRef;
  }

  public getAvailCoursesRef() {
    this.availCoursesRef = this.afs.collection<any>('available_courses', ref => ref.where('student_email', '==', this.afAuth.auth.currentUser.email));
    return this.availCoursesRef;
  }

  public enroll(availCourseId, courseName) {
    this.getStudentCoursesRef().add({course_name: courseName, student_email: this.afAuth.auth.currentUser.email});
    this.availCoursesRef.doc(availCourseId).delete();
  }

  public disenroll(courseTitle) {
    this.getAvailCoursesRef().add({course_title: courseTitle, student_email: this.afAuth.auth.currentUser.email});
  }

}
