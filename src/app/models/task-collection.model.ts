/**
 * @description task collection model
 */
import {collection, collectionData, CollectionReference, collectionSnapshots, Firestore, DocumentSnapshot} from "@angular/fire/firestore";
import {FireBaseDocument, FirebaseResolvedCollection} from "TaskCollectionTypes";
import {Observable, Observer, zip} from "rxjs";

export class AppFirestoreCollection<T> {
	private readonly _collectionReference: CollectionReference<T>;
	private readonly _collectionSnapShot$: Observable<DocumentSnapshot<T>[]>
	private readonly _collectionData$: Observable<T[]>;
	private _processedCollection: FirebaseResolvedCollection<T>

	constructor(
		private _fireStore: Firestore,
		private _collectionName: string
	) {
		this._collectionReference = collection(this._fireStore, this._collectionName) as CollectionReference<T>;
		this._collectionData$ = collectionData(this._collectionReference, {idField: 'id'}) as Observable<T[]>;
		this._collectionSnapShot$ = collectionSnapshots(this._collectionReference);
		this._processedCollection = {} as FirebaseResolvedCollection<T>;
	}

	getSimplerCollection(): Observable<FirebaseResolvedCollection<T>> {
		return new Observable<FirebaseResolvedCollection<T>>((observer: Observer<FirebaseResolvedCollection<T>>) => {
			try {
				zip(this._collectionSnapShot$, this._collectionData$)
					.subscribe((arraySnapAndDoc: [DocumentSnapshot<T>[], T[]]) => {
						const snapShots = arraySnapAndDoc[0];
						observer.next({
							ref: this._collectionReference,
							name: this._collectionName,
							snapShots,
							documents: snapShots.map((queryDocumentSnapshot: DocumentSnapshot<T>, idx: number) =>
								({
									value: arraySnapAndDoc[1][idx],
									meta: {
										ref: snapShots[idx].ref,
										snapShot: snapShots[idx]
									}
								} as FireBaseDocument<T>)
							)
						});
					})
			} catch (error: any) {
				console.error(error.message, error.stack);
				observer.error(error);
				observer.complete();
			}
		})
	}
}
