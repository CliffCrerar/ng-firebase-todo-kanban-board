import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { Task, TaskDialogResult } from './task/task.model';

import { Observable } from 'rxjs';
import { Firestore, collection, collectionChanges, collectionData, DocumentData, CollectionReference } from '@angular/fire/firestore';
import { firebaseApp$ } from '@angular/fire/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todo$: Observable<Task[]>;
  inProgress$: Observable<Task[]>;
  done$: Observable<Task[]>;
  title = 'ngtodoapp';

  constructor(private dialog: MatDialog, private store: Firestore) { 
    const temp = store.toJSON()
    console.log(store);
    console.log(store.toJSON());
    console.log(store.type);
    console.log(store.app);


    this.todo$  = this.createDataStore('todo');
    this.inProgress$  = this.createDataStore('inProgress');
    this.done$ = this.createDataStore('done');
    console.log(this.todo$);
    console.log(this.inProgress$);
    console.log(this.done$);
    [this.todo$,this.inProgress$,this.done$].forEach(obs => {
      obs.subscribe(value => {
        console.log(value);
        
      })
    })
    
  }

  createDataStore(storeName: string): Observable<Task[]> {
    const collectionVar = collection(this.store,storeName) as CollectionReference<Task>
    return collectionData<Task>(collectionVar);
  }
  
  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    console.log(list);
    console.log(task);
    
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
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


  drop(event: CdkDragDrop<Task[]> | any): void {
    console.log('event:',event);
    
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    
    // .runTransaction(() => {
    //   const promise = Promise.all([
    //     this.store.collection(event.previousContainer.id).doc(item.id).delete(),
    //     this.store.collection(event.container.id).add(item),
    //   ]);
    //   return promise;
    // });
    // transferArrayItem(
    //   event.previousContainer.data,
    //   event.container.data,
    //   event.previousIndex,
    //   event.currentIndex
    // );
  }

  newTask(event: Event): void {
    console.log(event);
    
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        console.log(result);
        
        if (!result) {
          return;
        }

        firebaseApp$.subscribe(fbapp=>{
          console.log(fbapp);
          
          
        })
        
        // this.store.app
      });
  }

}
