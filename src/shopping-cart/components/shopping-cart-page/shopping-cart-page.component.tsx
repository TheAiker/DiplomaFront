import { LayoutFull } from 'core/components/layout-full';
import React from 'react';
import { shoppingListService, TShoppingItem } from 'common/services';
import { ShoppingCartCheckout } from 'shopping-cart/components/shopping-cart-checkout';
import { ShoppingCartItem } from 'shopping-cart/components/shopping-cart-item';
import { useObservable } from 'utils';
import './shopping-cart-page.styles';

export function ShoppingCartPage(): JSX.Element {
    const cartItems = useObservable(shoppingListService.contents$, []);

    return (
        <div className="shopping-cart-page">
            <h3>Корзина</h3>

            <div className="shopping-cart-page__wrapper">
                <div className="shopping-cart-page__cart">
                    {cartItems.map((item: TShoppingItem) => (
                        <ShoppingCartItem key={item.product.id} item={item} />
                    ))}

                    {!cartItems.length ? (
                        <div>В вашей корзине нет товаров</div>
                    ) : <></>}
                </div>

                {!!cartItems.length ? (
                    <ShoppingCartCheckout cartItems={cartItems} />
                ) : <></>}
            </div>
        </div>
    );
}
