import { CrossIcon, TextField } from 'common/components'
import { ProductModel } from 'common/models'
import { TShoppingItem, shoppingListService } from 'common/services';
import React, { useCallback, useEffect, useState } from 'react';
import { formatMoney } from 'utils';
import './shopping-cart-item.styles';


export type TShoppingCartItemProps = {
    item: TShoppingItem;
};

export function ShoppingCartItem(props: TShoppingCartItemProps): JSX.Element {
    const { item } = props;
    const [itemAmount, setItemAmount] = useState(item.amount);

    const onItemAmountChangeHandler = useCallback((newValue: string) => {
        let newItemAmount = +newValue;

        if (!isNaN(newItemAmount)) {
            // Ensure that new item amount is no less than 1
            newItemAmount = Math.max(newItemAmount, 1);

            setItemAmount(newItemAmount);
            shoppingListService.setProductAmount(item.product, newItemAmount);
        }
    }, [item]);

    const onItemDeleteClickHandler = useCallback(() => {
        shoppingListService.removeProduct(item.product);
    }, [item]);

    useEffect(() => {
        if (itemAmount !== item.amount) {
            setItemAmount(() => item.amount);
        }
    }, [item.amount]);

    return (
        <div className="shopping-cart-item">
            <img className="shopping-cart-item__preview" src={item.product.productPreviewURL} />

            <div className="shopping-cart-item__info">
                <div className="shopping-cart-item__info-title">
                    {item.product.name}
                </div>

                <div className="shopping-cart-item__info-price">
                   {item.product.prettyPrice}
                </div>
            </div>

            <div className="shopping-cart-item__actions">
                <div className="shopping-cart-item__actions-amount">
                    <TextField
                        defaultValue={itemAmount.toString()}
                        noMargin
                        onChange={onItemAmountChangeHandler}
                        type="number"
                    />
                </div>

                <div className="shopping-cart-item__actions-total">
                    {formatMoney(item.amount * item.product.price)}
                </div>

                <div className="shopping-cart-item__actions-delete" onClick={onItemDeleteClickHandler}>
                    <CrossIcon />
                </div>
            </div>
        </div>
    );
}
