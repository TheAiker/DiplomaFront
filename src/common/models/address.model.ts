import { TAddress } from 'common/types';
import { JsonName, serialize } from 'tserialize';

export class AddressModel {

    @JsonName()
    city: string;

    @JsonName()
    street: string;

    @JsonName()
    house: string;

    @JsonName()
    flat: string;

    constructor(city: string, street: string, house: string, flat: string) {
        this.city = city;
        this.street = street;
        this.house = house;
        this.flat = flat;
    }

    toServer(): TAddress {
        return serialize(this) as TAddress;
    }

}
