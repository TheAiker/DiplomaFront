export type TCategory = {
    id: number;
    name: string;
};

export type TCreateCategoryRequest = {
    name: string;
};
export type TCreateCategoryResponse = TCategory;

export type TDeleteCategoryRequest = {
    categoryId: number;
};
export type TDeleteCategoryResponse = {};

export type TGetCategoriesResponse = Array<TCategory>;
