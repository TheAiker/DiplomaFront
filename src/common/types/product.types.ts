import { TImage } from './common.types';
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

export type TCreateProductResponse = TProduct;

export type TDeleteProductRequest = {
    productId: number;
};
export type TDeleteProductResponse = {};

export type TGetProductsResponse = Array<TProduct>;

export type TUploadPreviewImageRequest = {};
export type TUploadPreviewImageResponse = {};
