import { LayoutFull } from 'core/components/layout-full';
import React, { useCallback, useState } from 'react';
import { shoppingListService, TShoppingItem } from 'common/services';
import { ShoppingCartCheckout } from 'shopping-cart/components/shopping-cart-checkout';
import { ShoppingCartDetails } from 'shopping-cart/components/shopping-cart-details';
import { ShoppingCartItem } from 'shopping-cart/components/shopping-cart-item';
import { useObservable } from 'utils';
import './shopping-cart-page.styles';

enum ShoppingCartStep {
    EditCart,
    Details
}

export function ShoppingCartPage(): JSX.Element {
    const cartItems = useObservable(shoppingListService.contents$, []);
    const [step, setStep] = useState<ShoppingCartStep>(ShoppingCartStep.EditCart);
    const isDetails = step === ShoppingCartStep.Details;

    const onContinueToDetailsClickHandler = useCallback(() => {
        setStep(() => ShoppingCartStep.Details);
    }, []);

    return (
        <div className="shopping-cart-page">
            <h3>{isDetails ? 'Детали заказа' : 'Корзина'}</h3>
            {isDetails ? (
                <div className="shopping-cart-page__wrapper">
                    <div className="shopping-cart-page__cart">
                        <ShoppingCartDetails />
                    </div>

                    {!!cartItems.length ? (
                        <ShoppingCartCheckout cartItems={cartItems} onSubmit={onContinueToDetailsClickHandler} />
                    ) : <></>}
                </div>
            ) : (
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
                        <ShoppingCartCheckout cartItems={cartItems} onSubmit={onContinueToDetailsClickHandler} submitLabel="К оплате" />
                    ) : <></>}
                </div>
            )}
        </div>
    );
}
