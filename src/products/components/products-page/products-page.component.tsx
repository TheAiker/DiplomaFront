import cx from 'classnames';
import { Product } from 'core/components/product';
import { TextField } from 'common/components';
import { CategoryModel, ProductModel } from 'common/models';
import { categoryService, productService } from 'common/services';
import { LayoutFull } from 'core/components/layout-full';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useObservable } from 'utils';
import './products-page.styles';

const allProductsCategory = new CategoryModel(-1, 'Все продукты');

export function ProductsPage(): JSX.Element {
    const categories = useObservable(categoryService.categories$, []);
    const products = useObservable(productService.products$, []);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<CategoryModel>(allProductsCategory);
    const allCategories = [allProductsCategory, ...categories];
    const filteredProducts = products.filter((product: ProductModel) => {
        const doesCategoryMatch = selectedCategory.id === allProductsCategory.id || product.categoryId === selectedCategory.id;
        const doesNameContainsSearchText = product.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
        return doesCategoryMatch && doesNameContainsSearchText;
    });
    const searchPlaceholder = useMemo(() => {
        const productName = products.length > 0 ? products[Math.floor(Math.random() * (products.length - 1))].name : 'Телевизор';
        return `e.g. ${productName}`;
    }, [products]);

    return(
        <div className="products-page__wrapper">
            <div className="products-page__categories">
                <div className="products-page__categories-title">Фильтруйте по категориям</div>

                <div>
                    {allCategories.map((category: CategoryModel) => (
                        <ProductsPageCategory
                            category={category}
                            key={category.id}
                            selectCategory={setSelectedCategory}
                            selected={category.id === selectedCategory.id}
                        />
                    ))}
                </div>
            </div>

            <div className="products-page__products">
                <TextField
                    className="products-page__products-search"
                    label="Поиск"
                    name="productSearchFilter"
                    placeholder={searchPlaceholder}
                    onChange={setSearchText}
                    type="search"
                />

                <div className="products-page__products-wrapper">
                    {filteredProducts.map((product: ProductModel) => (
                        <Product key={product.id} product={product} />
                    ))}

                    {filteredProducts.length === 0 ? (
                        <div className="products-page__products-empty">Нет доступных продуктов в выбранной категории</div>
                    ) : <></>}
                </div>
            </div>
        </div>
    );
}

type TProductsPageCategoryProps = {
    category: CategoryModel;
    selected?: boolean;
    selectCategory: Dispatch<SetStateAction<CategoryModel>>;
};

function ProductsPageCategory(props: TProductsPageCategoryProps): JSX.Element {
    const { category, selected, selectCategory } = props;

    const onCategoryClickHandler = useCallback(() => selectCategory(category), [category]);

    return (
        <div
            className={cx('products-page__category', { 'products-page__category--selected': selected })}
            onClick={onCategoryClickHandler}
        >
            {category.name}
        </div>
    );
}
