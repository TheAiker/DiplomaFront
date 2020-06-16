import { MultiSwitch, TextField, TMultiSwitchItem } from 'common/components';
import { OrderPaymentType } from 'common/enums';
import { AddressModel } from 'common/models';
import { NewOrderRequest } from 'common/requests';
import { TShoppingItem } from 'common/services';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import './shopping-cart-details.styles';

const switchItems: Array<TMultiSwitchItem<void, OrderPaymentType>> = [
    { key: OrderPaymentType.PickupPayment, label: 'Забрать самому' },
    { key: OrderPaymentType.OnDeliveryPayment, label: 'Курьеру при получении' },
    { key: OrderPaymentType.OnlinePayment, label: 'Оплатить онлайн' }
];

export type TShoppingCartDetailsProps = {
    cartItems: Array<TShoppingItem>;
    onRequestUpdate: Dispatch<SetStateAction<NewOrderRequest | null>>;
};

export function ShoppingCartDetails(props: TShoppingCartDetailsProps): JSX.Element {
    const { cartItems, onRequestUpdate } = props;
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [house, setHouse] = useState('');
    const [flat, setFlat] = useState('');
    const [paymentType, setPaymentType] = useState<OrderPaymentType>(switchItems[0].key);
    const isAddressRequired = paymentType !== OrderPaymentType.PickupPayment;

    const onSwitchItemSelectHandler = useCallback((item: TMultiSwitchItem<void, OrderPaymentType>) => {
        if (item.key === OrderPaymentType.PickupPayment) {
            setCity(() => '');
            setStreet(() => '');
            setHouse(() => '');
            setFlat(() => '');
        }

        setPaymentType(() => item.key);
    }, []);

    useEffect(() => {
        const addressModel = new AddressModel(city, street, house, flat);
        const newRequestModel = new NewOrderRequest(addressModel, email, fullName, paymentType, phoneNumber, cartItems);

        onRequestUpdate(() => newRequestModel);
    }, [fullName, email, phoneNumber, city, street, house, flat, paymentType]);

    return (
        <div className="shopping-cart-details">
            <div className="shopping-cart-details__block shopping-cart-details__payment-type">
                <h4>Способ оплаты</h4>

                <MultiSwitch<void, OrderPaymentType> items={switchItems} onSelect={onSwitchItemSelectHandler} selectedKey={paymentType} />
            </div>

            <form className="shopping-cart-details__block shopping-cart-details__address">
                <h4>Основная информация</h4>
                <TextField label="ФИО" name="full-name" placeholder="Павлов Александр Иванович" onChange={setFullName} value={fullName} />
                <TextField label="Телефон" name="phone-number" placeholder="77 77777" onChange={setPhoneNumber} value={phoneNumber} />
                <TextField label="Email" name="email" placeholder="theguy@gmail.cum" onChange={setEmail} value={email} />

                {isAddressRequired ? (
                    <>
                        <h4>Адрес доставки</h4>

                        <TextField label="Город" name="address-city" placeholder="Тирасполь" onChange={setCity} value={city} />
                        <TextField label="Улица" name="address-street" placeholder="Горячая" onChange={setStreet} value={street} />
                        <TextField label="Номер дома" name="address-house" placeholder="56" onChange={setHouse} value={house} />
                        <TextField label="Квартира" name="address-flat" placeholder="127" onChange={setFlat} value={flat} />
                    </>
                ) : <></>}
            </form>
        </div>
    );
}

