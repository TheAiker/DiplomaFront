import { TImage, TServerResponse } from './common.types';
import { TCategory } from './category.types';

export type TProduct = {
    category: TCategory;
    id: number;
    name: string;
    price: number;
};

export type TCreateProductRequest = {
    category: number;
    name: string;
    price: number;
};

export type TCreateProductResponse = TServerResponse<TProduct>;

export type TDeleteProductResponse = TServerResponse<{}>;

export type TGetProductsResponse = TServerResponse<Array<TProduct>>;
