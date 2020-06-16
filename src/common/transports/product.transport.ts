import axios from 'axios';
import FormData from 'form-data';
import { ProductModel } from 'common/models';
import { TCreateProductRequest, TCreateProductResponse, TDeleteProductRequest, TDeleteProductResponse, TGetProductsResponse, TProduct, TUploadPreviewImageResponse } from 'common/types';
import { BaseTransport } from './base.transport';

export class ProductTransport extends BaseTransport {

    async createProduct(request: TCreateProductRequest): Promise<ProductModel> {
        const data = await this.post<TCreateProductRequest, TCreateProductResponse>('/api/products/create', request);

        return ProductModel.fromServer(data);
    }

    async deleteProduct(product: ProductModel): Promise<void> {
        await this.post<TDeleteProductRequest, TDeleteProductResponse>('/api/products/delete', { productId: product.id });
    }

    async getProducts(): Promise<Array<ProductModel>> {
        const data = await this.get<TGetProductsResponse>('/api/products');

        return data.map((data: TProduct) => ProductModel.fromServer(data));
    }

    async uploadPreviewImage(product: ProductModel, previewImageFile: File): Promise<void> {
        const formData = new FormData();
        formData.append('previewImage', previewImageFile);
        formData.append('productId', product.id);

        const headers = {
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': 'multipart/form-data'
        };

        await this.post<FormData, TUploadPreviewImageResponse>('/api/products/preview-upload', formData, { headers });
    }

}
export const productTransport = new ProductTransport();
