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
  
  private studentCoursesRef: AngularFirestoreCollection<any>;
  private availCoursesRef: AngularFirestoreCollection<any>;
  private coursesRef: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.createCoursesRef();
    this.createStudentCoursesRef();
    this.createAvailCoursesRef();
  }

  private createCoursesRef() {
    this.coursesRef = this.afs.collection<any>('courses');
  }

  private createStudentCoursesRef() {
    this.studentCoursesRef = this.afs.collection<any>('student_courses', ref => ref.where('student_email', '==', this.afAuth.auth.currentUser.email));
  }

  private createAvailCoursesRef() {
    this.availCoursesRef = this.afs.collection<any>('available_courses', ref => ref.where('student_email', '==', this.afAuth.auth.currentUser.email));
  }  

  public getCoursesRef() {    
    return this.coursesRef;
  }

  public getStudentCoursesRef() {
    return this.studentCoursesRef;
  }

  public getAvailCoursesRef() {
    return this.availCoursesRef;
  }

  public enroll(courseName) {
    this.studentCoursesRef.add({course_name: courseName, student_email: this.afAuth.auth.currentUser.email});
  }

  public disenroll(courseTitle) {
    this.availCoursesRef.add({course_title: courseTitle, student_email: this.afAuth.auth.currentUser.email});
  }

  ngOnDestroy(): void {

  }
}
