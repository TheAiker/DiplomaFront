import { CrossIcon, TextField } from 'common/components'
import { ProductModel } from 'common/models'
import { productService } from 'common/services'
import { productTransport } from 'common/transports'
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useObservable } from 'utils';
import './admin-products.styles';

export function AdminProducts(): JSX.Element {
    const products = useObservable(productService.products$, []);

    return (
        <div className="admin-products">
            <div className="admin-products__title">Удалить продукт</div>

            {products.map((product: ProductModel) => (
                <AdminProductsItem product={product} key={product.id} />
            ))}

            {products.length === 0 ? (
                <div>Нет продуктов доступных для удаления</div>
            ) : <></>}
        </div>
    );
}

type TAdminProductsItemProps = {
    product: ProductModel;
};

function AdminProductsItem(props: TAdminProductsItemProps): JSX.Element {
    const { product } = props;

    const onDeleteClickHandler = useCallback(async () => {
        try {
            await productTransport.deleteProduct(product);
            toast(`Продукт "${product.name}" удалён`, { type: 'success' });

            productService.triggerUpdate();
        } catch (error) {
            console.error(error);
            toast(`Не удалось удалить продукт :(`, { type: 'error' });
        }
    }, [product]);

    return (
        <div className="admin-products__item">
            <img className="admin-products__item-preview" src={product.productPreviewURL} />

            <div className="admin-products__item-title">
                {product.name}
            </div>

            <div className="admin-products__item-delete" onClick={onDeleteClickHandler}>
                <CrossIcon />
            </div>
        </div>
    );
}
