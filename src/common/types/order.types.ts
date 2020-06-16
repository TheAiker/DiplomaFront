import { OrderPaymentType } from 'common/enums';
import { TAddress } from './common.types';

export type TOrderProductItem = {
    amount: number;
    productId: number;
};

export type TNewOrderRequest = {
    address: TAddress;
    email: string;
    fullName: string;
    paymentType: OrderPaymentType;
    phoneNumber: string;
    products: Array<TOrderProductItem>;
};

export type TNewOrderResponse = {};
