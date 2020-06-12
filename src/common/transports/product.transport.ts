import axios from 'axios';
import FormData from 'form-data';
import { ProductModel } from 'common/models';
import { TCreateProductRequest, TCreateProductResponse, TGetProductsResponse, TProduct } from 'common/types';

export class ProductTransport {

    async createProduct(request: TCreateProductRequest): Promise<ProductModel> {
        const { data: { data } } = await axios.post<TCreateProductResponse>('/api/products/create', request);

        console.debug('create product result', data);

        return ProductModel.fromServer(data);
    }

    async getProducts(): Promise<Array<ProductModel>> {
        const { data: { data } } = await axios.get<TGetProductsResponse>('/api/products');

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

        await axios.post('/api/products/preview-upload', formData, { headers });
    }

}
export const productTransport = new ProductTransport();
