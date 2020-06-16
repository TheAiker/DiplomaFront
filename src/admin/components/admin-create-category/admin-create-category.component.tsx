import { Button, TextField } from 'common/components';
import { categoryService } from 'common/services';
import { categoryTransport } from 'common/transports';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import './admin-create-category.styles';

export function AdminCreateCategory(): JSX.Element {
    const [categoryName, setCategoryName] = useState('');

    const onCreateCategoryClickHandler = useCallback(async () => {
        if (!categoryName) {
            toast('Укажите название категории', { type: 'warning' });
            return;
        }

        try {
            await categoryTransport.createCategory(categoryName);
            toast(`Категория "${categoryName}" создана`, { type: 'success' });

            setCategoryName(() => '');

            categoryService.triggerUpdate();
        } catch (error) {
            console.error(error);
            toast(`Не удалось создать категорию :(`, { type: 'error' });
        }
    }, [categoryName]);

    return (
        <div className="admin-create-category">
            <div className="admin-create-category__title">Создать категорию</div>

            <TextField label="Название категории" name="categoryName" onChange={setCategoryName} value={categoryName} />

            <Button onClick={onCreateCategoryClickHandler}>Создать</Button>
        </div>
    );
}
