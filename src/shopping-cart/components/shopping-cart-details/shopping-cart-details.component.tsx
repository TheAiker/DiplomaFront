import { MultiSwitch, TextField, TMultiSwitchItem } from 'common/components';
import React, { useCallback, useState } from 'react';
import './shopping-cart-details.styles';

enum PaymentTypes {
    PickupPayment,
    OnDeliveryPayment,
    OnlinePayment
}

const switchItems: Array<TMultiSwitchItem<void, PaymentTypes>> = [
    { key: PaymentTypes.PickupPayment, label: 'Забрать самому' },
    { key: PaymentTypes.OnDeliveryPayment, label: 'Курьеру при получении' },
    { key: PaymentTypes.OnlinePayment, label: 'Оплатить онлайн' },
];

export function ShoppingCartDetails(): JSX.Element {
    const [paymentType, setPaymentType] = useState<PaymentTypes>(switchItems[0].key);
    const isAddressRequired = paymentType !== PaymentTypes.PickupPayment;

    const onSwitchItemSelectHandler = useCallback((item: TMultiSwitchItem<void, PaymentTypes>) => {
        setPaymentType(() => item.key);
    }, []);

    return (
        <div className="shopping-cart-details">
            <div className="shopping-cart-details__block shopping-cart-details__payment-type">
                <h4>Способ оплаты</h4>

                <MultiSwitch<void, PaymentTypes> items={switchItems} onSelect={onSwitchItemSelectHandler} selectedKey={paymentType} />
            </div>

            {isAddressRequired ? (
                <form className="shopping-cart-details__block shopping-cart-details__address">
                    <h4>Адрес доставки</h4>

                    <TextField label="Город" name="address-city" placeholder="Тирасполь" />
                    <TextField label="Улица" name="address-street" placeholder="Горячая" />
                    <TextField label="Номер дома" name="address-house" placeholder="56" />
                    <TextField label="Квартира" name="address-flat" placeholder="127" />
                </form>
            ) : <></>}
        </div>
    );
}
