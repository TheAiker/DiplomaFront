import { TServerResponse } from './common.types';

export type TCategory = {
    id: number;
    name: string;
};

export type TCreateCategoryResponse = TServerResponse<TCategory>;
export type TGetCategoriesResponse = TServerResponse<Array<TCategory>>;
