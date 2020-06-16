import { Button } from 'common/components';
import { TShoppingItem } from 'common/services';
import React, { useMemo } from 'react';
import { formatMoney } from 'utils';
import './shopping-cart-checkout.styles';

const shippingTax = 0.02;

export type ShoppingCartCheckoutProps = {
    cartItems: Array<TShoppingItem>;
    onSubmit: () => void;
    submitLabel?: string;
};

export function ShoppingCartCheckout(props: ShoppingCartCheckoutProps): JSX.Element {
    const { cartItems, onSubmit, submitLabel } = props;
    const productsSum = useMemo(() => {
        return cartItems.reduce((acc: number, item: TShoppingItem) => acc + (item.product.price * item.amount), 0);
    }, [cartItems]);
    const shipmentSum = productsSum * shippingTax;
    const totalSum = productsSum + shipmentSum;

    return (
        <div className="shopping-cart-checkout">
            <div className="shopping-cart-checkout__info-line shopping-cart-checkout__info-line--secondary">
                <span>Стоимость продуктов</span>
                <span>{formatMoney(productsSum)}</span>
            </div>

            <div className="shopping-cart-checkout__info-line shopping-cart-checkout__info-line--secondary">
                <span>Стоимость доставки</span>
                <span>{formatMoney(shipmentSum)}</span>
            </div>

            <div className="shopping-cart-checkout__info-line shopping-cart-checkout__info-line--primary">
                <span>Итого</span>
                <span>{formatMoney(totalSum)}</span>
            </div>

            <Button className="shopping-cart-checkout__submit" onClick={onSubmit}>{submitLabel || 'Оплатить'}</Button>
        </div>
    );
}
