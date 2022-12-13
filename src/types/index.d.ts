


declare type stringOrUndefined = string | undefined

declare interface FireBaseConfig {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: stringOrUndefined,
    measurementId: string
}

declare interface Environment {
    production: boolean,
    firebaseConfig: FireBaseConfig
}


interface env {
    FB_APIKEY: stringOrUndefined,
    FB_APPID: stringOrUndefined,
    FB_AUTHDOMAIN: stringOrUndefined,
    FB_MEASUREMENTID: stringOrUndefined,
    FB_MESSAGINGSENDERID: stringOrUndefined,
    FB_PROJECTID: stringOrUndefined,
    FB_STORAGEBUCKET: stringOrUndefined

}
interface process {
    env: env
}

interface global {
    process: process
}

declare module 'global' {
    interface process extends global {}
}

declare module 'TaskCollectionTypes' {
	import {CollectionReference, QueryDocumentSnapshot, DocumentSnapshot, DocumentReference} from "@angular/fire/firestore";

	interface FirebaseDocumentMeta<T> {
		snapShot: DocumentSnapshot<T>;
		ref: DocumentReference<T>;
	}

	interface FireBaseDocument<T> {
		value: T;
		meta: FirebaseDocumentMeta<T>
	}

	interface FirebaseResolvedCollection<T> {
		name: string;
		ref: CollectionReference<T>;
		snapShots: DocumentSnapshot<T>[];
		documents: FireBaseDocument<T>[];
	}
	export {FirebaseResolvedCollection,FireBaseDocument,FirebaseDocumentMeta}
}

