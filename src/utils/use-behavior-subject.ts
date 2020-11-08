import { BehaviorSubject } from 'rxjs';
import { useObservable } from './use-observable';

export const useBehaviorSubject = <A>(property: BehaviorSubject<A>): A => useObservable(property, property.getValue());
