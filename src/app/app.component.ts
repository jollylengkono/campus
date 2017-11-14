import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CoursesPage } from '../pages/courses/courses';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth, public authProvider: AuthProvider) {
    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = 'LoginPage';
        authObserver.unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }

  goToCourses(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CoursesPage);
  }

  logoutUser() {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    })
  }
}
