import { TServerResponse } from './common.types';

export type TCategory = {
    id: number;
    name: string;
};

export type TCreateCategoryResponse = TServerResponse<TCategory>;

export type TDeleteCategoryResponse = TServerResponse<{}>;

export type TGetCategoriesResponse = TServerResponse<Array<TCategory>>;
