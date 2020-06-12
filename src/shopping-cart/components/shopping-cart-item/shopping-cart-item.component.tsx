import { TShoppingItem, shoppingListService } from 'common/services';
import { ProductModel} from 'common/models'
import React, { useCallback } from 'react';
import './shopping-cart-item.styles';


export type TShoppingCartItemProps = {
    item: TShoppingItem;
};

export function ShoppingCartItem(props: TShoppingCartItemProps): JSX.Element {
    const { item } = props;

    const onItemDeleteClickHandler = useCallback(() => {
        shoppingListService.removeProduct(item.product);
    }, [item]);

    return (
        <div className="shopping-cart-item">
            <img className="shopping-cart-item__preview" src={item.product.productPreviewURL} alt="1"/>

            <div className="shopping-cart-item__info">
                <div className="shopping-cart-item__info-title">
                    {item.product.name}
                </div>

                <div className="shopping-cart-item__info-price">
                   ${item.product.price}
                </div>
            </div>

            <div className="shopping-cart-item__actions">
                <div className="shopping-cart-item__amount">
                    {item.amount}
                </div>

                <button className="shopping-cart-item__delete" onClick={onItemDeleteClickHandler}>
                    Delete
                </button>
            </div>
        </div>
    );
}
