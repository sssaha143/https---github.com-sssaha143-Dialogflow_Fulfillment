import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatService } from './chat/chat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatDialogTestComponent } from './chat/chat-dialog-test/chat-dialog-test.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BsDropdownModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {firebase} from '../environments/firebase';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
@NgModule({
  declarations: [
    AppComponent,
    ChatDialogTestComponent,
    
  ],
  imports: [
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
AngularFirestoreModule, // Only required for database features
AngularFireAuthModule, // Only required for auth features,
AngularFireStorageModule, // Only required for storage features
    BsDropdownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    SlickCarouselModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }