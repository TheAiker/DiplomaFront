import { ProductModel } from 'common/models';
import { BehaviorSubject, Observable } from 'rxjs';

export type TShoppingItem = {
    amount: number;
    product: ProductModel;
};

export class ShoppingListService {

    private _store$: BehaviorSubject<Array<TShoppingItem>> = new BehaviorSubject<Array<TShoppingItem>>([]);

    contents$: Observable<Array<TShoppingItem>> = this._store$.asObservable();

    addProduct(product: ProductModel, amount: number = 1): void {
        const currentContents = this._store$.value;
        const foundShoppingItemIndex = currentContents.findIndex((item: TShoppingItem) => item.product.id === product.id);

        // Index -1 means item matching search function wasn't found
        if (foundShoppingItemIndex === -1) {
            const newShoppingItem = { amount, product };
            currentContents.push(newShoppingItem);
        } else {
            currentContents[foundShoppingItemIndex].amount += amount;
        }

        this._store$.next(currentContents);
    }

    removeProduct(product: ProductModel): void {
        const currentContents = this._store$.value;
        const newCurrentContents = currentContents.filter((item: TShoppingItem) => item.product.id !== product.id);

        this._store$.next(newCurrentContents);
    }

    setProductAmount(product: ProductModel, amount: number = 1): void {
        const currentContents = this._store$.value;
        const foundShoppingItemIndex = currentContents.findIndex((item: TShoppingItem) => item.product.id === product.id);

        if (foundShoppingItemIndex !== -1) {
            currentContents[foundShoppingItemIndex].amount = amount;
            this._store$.next(currentContents);
        }
    }

}

export const shoppingListService = new ShoppingListService();
