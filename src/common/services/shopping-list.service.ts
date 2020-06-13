import { ProductModel } from 'common/models';
import { BehaviorSubject, Observable } from 'rxjs';

export type TShoppingItem = {
    amount: number;
    product: ProductModel;
};

export class ShoppingListService {

    contents$: BehaviorSubject<Array<TShoppingItem>> = new BehaviorSubject<Array<TShoppingItem>>([]);

    addProduct(product: ProductModel, amount: number = 1): void {
        const currentContents = this.contents$.value;
        const foundShoppingItemIndex = currentContents.findIndex((item: TShoppingItem) => item.product.id === product.id);

        // Index -1 means no item matching the filter was found
        if (foundShoppingItemIndex !== -1) {
            this.setProductAmount(product, currentContents[foundShoppingItemIndex].amount + amount);
            return;
        }

        const newContents = [...currentContents];
        const newShoppingItem = { amount, product };
        newContents.push(newShoppingItem);
        this.contents$.next(newContents);
    }

    removeProduct(product: ProductModel): void {
        const currentContents = this.contents$.value;
        const newContents = currentContents.filter((item: TShoppingItem) => item.product.id !== product.id);

        this.contents$.next(newContents);
    }

    setProductAmount(product: ProductModel, amount: number = 1): void {
        const currentContents = this.contents$.value;
        const newContents = [...currentContents];
        const foundShoppingItemIndex = currentContents.findIndex((item: TShoppingItem) => item.product.id === product.id);

        if (foundShoppingItemIndex !== -1) {
            const newShoppingItem = {
                ...currentContents[foundShoppingItemIndex],
                amount
            };

            newContents[foundShoppingItemIndex] = newShoppingItem;

            this.contents$.next(newContents);
        }
    }

}

export const shoppingListService = new ShoppingListService();
