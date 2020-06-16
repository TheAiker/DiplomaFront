import axios from 'axios';
import { NewOrderRequest } from 'common/requests';
import { TNewOrderRequest, TNewOrderResponse } from 'common/types';
import { BaseTransport } from './base.transport';

export class OrderTransport extends BaseTransport {

    async newOrder(request: NewOrderRequest): Promise<void> {
        await this.post<TNewOrderRequest, TNewOrderResponse>('/api/orders/new', request.toServer());
    }

}

export const orderTransport = new OrderTransport();
