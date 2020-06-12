import { useEffect, useMemo, useState } from 'react';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export function useObservable<T>(source: Observable<T> | (() => Observable<T>), defaultValue: T): T {
    const source$ = useMemo(() => source instanceof Function ? source() : source, [source]);
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
        const subscription = source$.subscribe((value: T) => setValue(() => value));

        return () => subscription.unsubscribe();
    }, []);

    return value;
}
