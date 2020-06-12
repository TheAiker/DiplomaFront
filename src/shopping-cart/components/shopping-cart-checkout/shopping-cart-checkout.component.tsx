import { Button } from 'common/components';
import { TShoppingItem } from 'common/services';
import React, { useMemo } from 'react';
import './shopping-cart-checkout.styles';

const shippingTax = 0.02;

export type ShoppingCartCheckoutProps = {
    cartItems: Array<TShoppingItem>;
};

export function ShoppingCartCheckout(props: ShoppingCartCheckoutProps): JSX.Element {
    const { cartItems } = props;
    const productsSum = useMemo(() => {
        return cartItems.reduce((acc: number, item: TShoppingItem) => acc + item.product.price * item.amount, 0);
    }, [cartItems]);
    const shipmentSum = productsSum * shippingTax;
    const totalSum = productsSum + shipmentSum;

    return (
        <div className="shopping-cart-checkout">
            <div className="shopping-cart-checkout__info-line shopping-cart-checkout__info-line--secondary">
                <span>Стоимость продуктов</span>
                <span>${productsSum}</span>
            </div>

            <div className="shopping-cart-checkout__info-line shopping-cart-checkout__info-line--secondary">
                <span>Стоимость доставки</span>
                <span>${shipmentSum}</span>
            </div>

            <div className="shopping-cart-checkout__info-line shopping-cart-checkout__info-line--primary">
                <span>Итого</span>
                <span>${totalSum}</span>
            </div>

            <Button className="shopping-cart-checkout__submit">Checkout</Button>
        </div>
    );
}
