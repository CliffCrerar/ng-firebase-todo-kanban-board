import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TaskDialogComponent} from './task-dialog/task-dialog.component';
import {Task, TaskDialogResult} from './models/task.model';

import {catchError, finalize, merge, mergeAll, Observable, Subscription} from 'rxjs';
import {
	Firestore, QueryDocumentSnapshot, collection, collectionData, CollectionReference, setDoc, doc, runTransaction, docData, getDocs, getDoc, collectionSnapshots
} from '@angular/fire/firestore';
import {promisifyObservable} from "./utils/promisify-observable";
import {AppFirestoreCollection} from "./models/task-collection.model";


@Component({
	selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.scss']
})
export class AppComponent {
	[idx: string]: any;
	title = 'ngtodoapp';

	dataSnapshots: { todo: Task[], inProgress: Task[], done: Task[] }

	constructor(private dialog: MatDialog, private fireStore: Firestore) {

		const temp = fireStore.toJSON()
		console.log(temp);
		console.log(fireStore);
		console.log(fireStore.toJSON());
		console.log(fireStore.type);
		console.log(fireStore.app);

		this.dataSnapshots = {todo: [], inProgress: [], done: []}
		// const dataObservers: Observable<QueryDocumentSnapshot<Task>[]>[] = [this.todo$, this.inProgress$, this.done$]

		// Promise.all(dataObservers.map((collectionSnapShots: Observable<QueryDocumentSnapshot<Task>[]>) =>
		// 	promisifyObservable<QueryDocumentSnapshot<Task>[]>(collectionSnapShots)))
		// 	.then(result => {
		// 		console.log(result)
		// 		result.forEach((resolvedPromise,idx)=>{
		// 			console.log(resolvedPromise)
		// 		})
		// 	})

		const todo = new AppFirestoreCollection<Task>(this.fireStore, 'todo')
			.getSimplerCollection()
			.subscribe({
				next: value => console.log(value),
				error: err => console.error(err),
				complete: () => console.info('AppFirestoreCollection COMPLETED')
			})

	}

	getCollectionData(collectionRef: CollectionReference<Task>): Observable<Task[]> {
		return collectionData<Task>(collectionRef, {idField: 'id'});
	}

	editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
		console.log(list);
		console.log(task);
		const dialogRef = this.dialog.open(TaskDialogComponent, {
			data: {
				task, enableDelete: true,
			},
		});
		dialogRef.afterClosed().subscribe((result: TaskDialogResult | undefined) => {
			if (!result) {
				return;
			}
			if (result.delete) {
				// this.store.collection(list).doc(task.id).delete();
				console.log(list);
				console.log(list);
			} else {
				// this.store.collection(list).doc(task.id).update(task);
				console.log(list);
				console.log(list);
			}
		});
	}


	drop(event: CdkDragDrop<Task> | any): void {
		console.log('event:', event);
		console.log('event:', event.previousContainer.id);
		console.log('event:', event.container.id);
		console.log('event:', event.item);
		const dropDoc = event.container.data[0];
		console.log(dropDoc);
		if (event.previousContainer === event.container) {
			return;
		}
		// const item = event.previousContainer.data[event.previousIndex];
		runTransaction(this.fireStore, trans => {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
			console.log(trans);

			console.log(event.previousContainer.data);
			console.log(event.previousContainer.id);

			console.log(event.container.id);
			console.log(event.container.data)
			const data = event.container.data[0];
			const documentId: string = event.container.data[0].id;

			let subs = new Subscription();
			event.container.dropped.subscribe({
				next: (dropEvent: any) => {
					console.log(dropEvent);
				}
			});
			Promise.all([
				trans.set<Task>(doc<Task>(this[event.item.dropContainer.id + 'Collection'], documentId), data),
				trans.delete(doc(this[event.previousContainer.id + 'Collection'], documentId))
			]).then(result => {
				result.forEach((result, idx) => {
					console.log('Result ', idx, ':', result);
				})
			}).catch(catchError)

			// trans.set()


			// getDoc(documentRef).then(result=>{
			// 	console.log(result)
			// });

			//
			// trans.get(docRef).then(value=>{
			// 	console.log('VAL',value);
			// })

			// console.log(docRef);
			return Promise.resolve()

			// }).then(updateResult => {
			// 	console.log('updateResult:', updateResult)
			// }).catch(onRejected => {
			// 	console.error('onRejected:', onRejected);
			// })
			// ?runTransaction(() => {
			// const promise = Promise.all([
			//   this.store.collection(event.previousContainer.id).doc(item.id).delete(),
			//   this.store.collection(event.container.id).add(item),
			// ]);
			// return promise;
			// });

		})
	}

	newTask(event: Event): void {
		console.log(event);


		const dialogRef = this.dialog.open(TaskDialogComponent, {
			data: {
				task: {},
			},
		});
		dialogRef.afterClosed()
			.subscribe((result: TaskDialogResult | undefined) => {

				if (!result) {
					return;
				}
				// setDoc(docRef, result.task).catch(catchError)
			});
	}

}
