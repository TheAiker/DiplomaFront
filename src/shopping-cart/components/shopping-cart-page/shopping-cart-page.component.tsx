import { LayoutFull } from 'core/components/layout-full';
import { NewOrderRequest } from 'common/requests';
import { shoppingListService, TShoppingItem } from 'common/services';
import { orderTransport } from 'common/transports';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
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
    const history = useHistory();
    const [step, setStep] = useState<ShoppingCartStep>(ShoppingCartStep.EditCart);
    const [request, setRequest] = useState<NewOrderRequest | null>(null);
    const isDetails = step === ShoppingCartStep.Details;

    const onContinueToDetailsClickHandler = useCallback(() => {
        setStep(() => ShoppingCartStep.Details);
    }, []);

    const onSubmitOrderClickHandler = useCallback(async () => {
        try {
            if (!request) {
                toast('Заполните форму', { type: 'warning' });
                return;
            }

            await orderTransport.newOrder(request);

            history.push('/products');
            toast('Заказ успешно создан', { type: 'success' });
        } catch (error) {
            console.error(error);
            toast('Не удалось создать заказ', { type: 'error' });
        }
    }, [request]);

    return (
        <div className="shopping-cart-page">
            <h3>{isDetails ? 'Детали заказа' : 'Корзина'}</h3>
            {isDetails ? (
                <div className="shopping-cart-page__wrapper">
                    <div className="shopping-cart-page__cart">
                        <ShoppingCartDetails cartItems={cartItems} onRequestUpdate={setRequest} />
                    </div>

                    {!!cartItems.length ? (
                        <ShoppingCartCheckout cartItems={cartItems} onSubmit={onSubmitOrderClickHandler} />
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

