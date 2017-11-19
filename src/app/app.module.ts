import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CoursesPage } from '../pages/courses/courses';
import { MyCoursesPage } from '../pages/my-courses/my-courses';
import { LoginPage } from '../pages/login/login';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CourseProvider } from '../providers/course/course';
import { AvailableCoursesPage } from '../pages/available-courses/available-courses';

export const firebaseConfig = {
  apiKey: "AIzaSyCe96GaTSsaVSyOYe_WIe-X2AoVNzNbxdg",
  authDomain: "campus-apps.firebaseapp.com",
  databaseURL: "https://campus-apps.firebaseio.com",
  projectId: "campus-apps",
  storageBucket: "campus-apps.appspot.com",
  messagingSenderId: "1035313276392"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CoursesPage,
    MyCoursesPage,
    LoginPage,
    AvailableCoursesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CoursesPage,
    MyCoursesPage,
    LoginPage,
    AvailableCoursesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    CourseProvider
  ]
})
export class AppModule {}
