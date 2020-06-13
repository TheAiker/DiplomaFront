import { ProductModel } from 'common/models';
import { shoppingListService } from 'common/services';
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { formatMoney } from 'utils';
import './product.styles';

export type TProductProps = {
    product: ProductModel;
};

export function Product(props: TProductProps): JSX.Element {
    const { product } = props;

    const onProductClickHandler = useCallback(() => {
        shoppingListService.addProduct(product);
        toast(`Добавили "${product.name}" в корзину`, { type: 'info' });
    }, [product])

    return (
        <div className="product" onClick={onProductClickHandler}>
            <img className="product__image" src={product.productPreviewURL} alt="1"/>

            <div className="product__info">
                <span className="product__info-name">{product.name}</span>
                <span className="product__info-price">${formatMoney(product.price)}</span>
            </div>
        </div>
    );
}
