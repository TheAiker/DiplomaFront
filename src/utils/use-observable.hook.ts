import { useEffect, useMemo, useState } from 'react';
import { Observable } from 'rxjs';

export function useObservable<T>(source$: Observable<T>, defaultValue: T, dependencies: Array<unknown> = []): T {
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
        const subscription = source$.subscribe((v: T) => {
            setValue(() => v);
        });

        return () => subscription.unsubscribe();
    }, [source$, ...dependencies]);

    return value;
}
