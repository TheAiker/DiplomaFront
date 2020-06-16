import axios from 'axios';
import { CategoryModel } from 'common/models';
import { TCreateCategoryRequest, TCreateCategoryResponse, TDeleteCategoryRequest, TDeleteCategoryResponse, TGetCategoriesResponse, TCategory } from 'common/types';
import { BaseTransport } from './base.transport';

export class CategoryTransport extends BaseTransport {

    async createCategory(name: string): Promise<CategoryModel> {
        const data = await this.post<TCreateCategoryRequest, TCreateCategoryResponse>('/api/categories/create', { name });

        return CategoryModel.fromServer(data);
    }

    async deleteCategory(category: CategoryModel): Promise<void> {
        await this.post<TDeleteCategoryRequest, TDeleteCategoryResponse>('/api/categories/delete', { categoryId: category.id });
    }

    async getCategories(): Promise<Array<CategoryModel>> {
        const data = await this.get<TGetCategoriesResponse>('/api/categories');

        return data.map((data: TCategory) => CategoryModel.fromServer(data));
    }

}
export const categoryTransport = new CategoryTransport();
