import { CrossIcon, TextField } from 'common/components'
import { CategoryModel } from 'common/models'
import { categoryService, productService } from 'common/services'
import { categoryTransport } from 'common/transports'
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useObservable } from 'utils';
import './admin-categories.styles';

export function AdminCategories(): JSX.Element {
    const categories = useObservable(categoryService.categories$, []);

    return (
        <div className="admin-categories">
            <div className="admin-categories__title">Удалить категорию</div>

            {categories.map((category: CategoryModel) => (
                <AdminCategoriesItem category={category} key={category.id} />
            ))}

            {categories.length === 0 ? (
                <div>Нет категорий доступных для удаления</div>
            ) : <></>}
        </div>
    );
}

type TAdminCategoriesItemProps = {
    category: CategoryModel;
};

function AdminCategoriesItem(props: TAdminCategoriesItemProps): JSX.Element {
    const { category } = props;

    const onDeleteClickHandler = useCallback(async () => {
        try {
            await categoryTransport.deleteCategory(category);
            toast(`Категория "${category.name}" удалена`, { type: 'success' });

            categoryService.triggerUpdate();
            productService.triggerUpdate();
        } catch (error) {
            console.error(error);
            toast(`Не удалось удалить категорию :(`, { type: 'error' });
        }
    }, [category]);

    return (
        <div className="admin-categories__item">
            <div className="admin-categories__item-title">
                {category.name}
            </div>

            <div className="admin-categories__item-delete" onClick={onDeleteClickHandler}>
                <CrossIcon />
            </div>
        </div>
    );
}
