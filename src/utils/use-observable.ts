import { useEffect, useMemo, useState } from 'react';
import { Observable } from 'rxjs';

export const useObservable = <A>(fa: Observable<A>, initial: A): A => {
	const [value, setValue] = useState(() => initial);
	const subscription = useMemo(
		() =>
			fa.subscribe((a) => {
				//ignore state toggle functions and allow passing functions in Observable
				setValue(() => a);
			}),
		[fa, setValue],
	);
	useEffect(() => () => subscription.unsubscribe(), [subscription]);
	return value;
};
