import { Button, SelectField, TextField, TSelectItem } from 'common/components';
import { CategoryModel } from 'common/models';
import { categoryService, productService } from 'common/services';
import { productTransport } from 'common/transports';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ImageUploader from 'react-images-upload';
import { toast } from 'react-toastify';
import { useObservable } from 'utils';
import './admin-create-product.styles';

export function AdminCreateProduct(): JSX.Element {
    const categories = useObservable(categoryService.categories$, []);
    const categoryItems = useMemo(() => categories.map((category: CategoryModel) => ({
        id: String(category.id),
        label: category.name,
        value: category
    })), [categories]);
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    const [image, setImage] = useState<File | null>(null);
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState('-1');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (categoryId === '-1' && categories.length > 0) {
            setCategoryId(String(categories[0].id));
        }
    }, [categoryId, categories]);

    const onSelectCategoryHandler = useCallback((category: CategoryModel) => {
        setCategoryId(() => String(category.id));
    }, []);

    const onCreateProductClickHandler = useCallback(async () => {
        if (!productName) {
            toast('Укажите название продукта', { type: 'error' });
            return;
        }

        if (!price) {
            toast('Укажите цену продукта', { type: 'error' });
            return;
        }

        if (isNaN(+price)) {
            toast('Укажите валидную цену продукта', { type: 'error' });
            return;
        }

        if (categoryId === '-1') {
            toast('Выберите категорию продукта', { type: 'error' });
            return;
        }

        if (!image) {
            toast('Сперва выберите картинку для превью продукта', { type: 'error' });
            return;
        }

        try {
            const resultModel = await productTransport.createProduct({
                name: productName,
                category: +categoryId,
                price: +price
            });
            toast(`Продукт "${productName}" создан`, { type: 'success' });

            setProductName(() => '');
            setCategoryId(() => '-1');
            setPrice(() => '');

            await productTransport.uploadPreviewImage(resultModel, image);

            productService.triggerUpdate();
        } catch (error) {
            console.error(error);
            toast(`Не удалось создать категорию :(`, { type: 'error' });
        }
    }, [categoryId, image, price, productName]);

    const onImageChangeHandler = useCallback((files: Array<File>, pictures: Array<string>) => {
        setImage(()  => (files.length > 0 && files[0]) ? files[0] : null);
    }, []);

    return (
        <div className="admin-create-product">
            <div className="admin-create-product__title">Новый продукт</div>

            <TextField
                label="Название продукта"
                name="productName"
                placeholder="Носки"
                onChange={setProductName}
                value={productName}
            />

            <TextField
                label="Цена"
                name="productPrice"
                placeholder="1337.69"
                onChange={setPrice}
                value={price}
            />

            <SelectField
                label="Категория"
                name="productCategory"
                items={categoryItems}
                onSelect={onSelectCategoryHandler}
            />

            <div className="admin-create-product__label">Фото продукта</div>
            <ImageUploader
                buttonText='Выберите изображение'
                className="admin-create-product__file-uploader"
                imgExtension={['.jpg', '.jpeg', '.png']}
                label="Макс. размер: 5 МБ, разрешённые форматы: .jpg, .png"
                maxFileSize={maxFileSize}
                onChange={onImageChangeHandler}
                singleImage
                withIcon
                withPreview
            />

            <Button onClick={onCreateProductClickHandler}>Создать</Button>
        </div>
    );
}
