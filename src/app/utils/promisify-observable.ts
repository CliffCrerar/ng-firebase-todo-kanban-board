import {finalize, Observable} from "rxjs";

type _PromiseResolution<T> = (result: T | PromiseLike<T>) => void;
type _PromiseRejection = (error: Error) => void;

export const promisifyObservable = <T>(observer: Observable<T>): Promise<T> => {
	const subscriptionParameter = (resolve: _PromiseResolution<T>,reject: _PromiseRejection ) => ({
		next: (result: T) => resolve(result),
		error: (error: Error) => reject(error),
		complete: () => console.log('promisifyObservable completed')
	})
	return new Promise<T>((resolve: _PromiseResolution<T>, reject: _PromiseRejection) =>
		finalize(observer.pipe().subscribe(subscriptionParameter(resolve,reject)).unsubscribe));
}
