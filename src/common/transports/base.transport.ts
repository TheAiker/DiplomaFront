import axios, { AxiosRequestConfig } from 'axios';
import { TServerResponse } from 'common/types';

export class BaseTransport {

    async get<R>(path: string, options?: AxiosRequestConfig): Promise<R> {
        const { data: responseData  } = await axios.get<TServerResponse<R>>(path, options);
        const { data, error, success } = responseData;

        if (!success) {
            throw new Error(`Request for ${path} failed: ${error || 'Internal error'}`);
        }

        return data;
    }

    async post<T, R>(path: string, request: T, options?: AxiosRequestConfig): Promise<R> {
        const { data: responseData  } = await axios.post<TServerResponse<R>>(path, request, options);
        const { data, error, success } = responseData;

        if (!success) {
            throw new Error(`Request for ${path} failed: ${error || 'Internal error'}`);
        }

        return data;
    }

}
