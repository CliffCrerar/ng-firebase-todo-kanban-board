import { AppFirestoreCollection } from './task-collection.model';
import {TestBed} from "@angular/core/testing";
import {initializeApp} from "firebase/app";
import {FirebaseApp} from "@angular/fire/app";
import {environment} from "../../environments/environment";
import {Firestore, getFirestore, provideFirestore} from "@angular/fire/firestore";
initializeApp()
describe('TaskCollection', () => {
	let fireBaseApp: FirebaseApp;
	let fireBaseFireStore: Firestore;
	beforeEach(async()=>{
		fireBaseApp = initializeApp(environment.firebaseConfig);
		fireBaseFireStore = getFirestore();


	})
		it('should create an instance', () => {
			expect(new AppFirestoreCollection(fireBaseFireStore, 'some-firestore')).toBeTruthy();
		});


});
