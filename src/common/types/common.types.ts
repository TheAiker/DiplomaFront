export type TAddress = {
    /* Город */
    city: string;
    /* Улица */
    street: string;
    /* Номер здания */
    house: string;
    /* Номер квартиры/офиса */
    flat: string;
};

export type TImage = {
    id: number;
    hash: string;
};

export type TServerResponse<T> = {
    success: boolean;
    data: T;
    error?: string;
};
