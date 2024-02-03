import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateBoxComponent } from '../components/translate-box/translate-box.component';
import { SecondsToTimePipe } from '../pipes/seconds-to-time.pipe';


@NgModule({
  declarations: [
    HomeComponent, 
    TranslateBoxComponent,
    SecondsToTimePipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    IonicModule
  ]
})
export class HomeModule { }
