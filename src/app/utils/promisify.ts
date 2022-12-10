import {finalize, Observable, Subscription} from "rxjs";

export const promisify = <T>(observer: Observable<T>): Promise<T> => {
	let subscription = new Subscription();
	let finalizing = finalize(subscription.unsubscribe);
	const promiseFunction = <T>(resolve: (result: T | PromiseLike<T>) => void, reject: any) => {
		subscription = observer.pipe()
			.subscribe({
				next: (result: T) => resolve(result),
				error: (error: Error) => reject(error),
				complete: () => console.log('promisify completed')
			} as any)
	};
	console.log(subscription.closed);
	return new Promise<T>(promiseFunction);
}
