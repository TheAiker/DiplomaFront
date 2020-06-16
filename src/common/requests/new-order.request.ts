import { OrderPaymentType } from 'common/enums';
import { AddressModel } from 'common/models';
import { TShoppingItem } from 'common/services';
import { TNewOrderRequest, TOrderProductItem } from 'common/types';
import { JsonArray, JsonName, JsonStruct, serialize } from 'tserialize';

export class NewOrderRequest {

    @JsonStruct(AddressModel)
    address: AddressModel;

    @JsonName()
    email: string;

    @JsonName()
    fullName: string;

    @JsonName()
    paymentType: OrderPaymentType;

    @JsonName()
    phoneNumber: string;

    @JsonName()
    products: Array<TOrderProductItem>;

    constructor(
        address: AddressModel,
        email: string,
        fullName: string,
        paymentType: OrderPaymentType,
        phoneNumber: string,
        products: Array<TShoppingItem>
    ) {
        this.address = address;
        this.email = email;
        this.fullName = fullName;
        this.paymentType = paymentType;
        this.phoneNumber = phoneNumber;
        this.products = products.map(({ amount, product }: TShoppingItem) => ({ amount, productId: product.id  }));
    }

    toServer(): TNewOrderRequest {
        return serialize(this) as TNewOrderRequest;
    }

}
