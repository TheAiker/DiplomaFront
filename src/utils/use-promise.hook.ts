import { useEffect, useState } from 'react';

export function usePromise<T>(promise: Promise<T> | (() => Promise<T>), defaultValue: T): T {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        let waitingForPromise = true;
        let prom = promise instanceof Promise ? promise : promise();

        prom.then((result: T) => {
            if (waitingForPromise) {
                setValue(result);
            }
        });

        return () => {
            waitingForPromise = false;
        };
    }, []);

    return value;
}
