import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TaskComponent} from './task/task.component';
import {MatDialogModule} from '@angular/material/dialog';
import {TaskDialogComponent} from './task-dialog/task-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field'
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {environment} from 'src/environments/environment';
import {FirebaseApps, initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
const NgTodoAppFirebaseAppModule = provideFirebaseApp(() => initializeApp());
const NgTodoAppMyFireStoreModule = provideFirestore(() => getFirestore());

@NgModule({
	declarations: [
		AppComponent,
		TaskComponent,
		TaskDialogComponent
	],
	imports: [
		NgTodoAppFirebaseAppModule,
		NgTodoAppMyFireStoreModule,
		MatCardModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		DragDropModule,
		MatDialogModule,
		MatFormFieldModule,
		FormsModule,
		MatInputModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
