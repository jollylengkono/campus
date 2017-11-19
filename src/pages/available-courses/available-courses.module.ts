import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvailableCoursesPage } from './available-courses';

@NgModule({
  declarations: [
    AvailableCoursesPage,
  ],
  imports: [
    IonicPageModule.forChild(AvailableCoursesPage),
  ],
})
export class AvailableCoursesPageModule {}
