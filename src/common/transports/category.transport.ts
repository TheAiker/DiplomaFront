import axios from 'axios';
import { CategoryModel } from 'common/models';
import { TCreateCategoryResponse, TGetCategoriesResponse, TCategory } from 'common/types';

export class CategoryTransport {

    async createCategory(name: string): Promise<CategoryModel> {
        const { data: { data } } = await axios.post<TCreateCategoryResponse>('/api/categories/create', { name });

        return CategoryModel.fromServer(data);
    }

    async getCategories(): Promise<Array<CategoryModel>> {
        const { data: { data } } = await axios.get<TGetCategoriesResponse>('/api/categories');

        return data.map((data: TCategory) => CategoryModel.fromServer(data));
    }
}
export const categoryTransport = new CategoryTransport();
