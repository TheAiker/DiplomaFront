import { ProductModel } from 'common/models';
import { productTransport } from 'common/transports';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export class ProductService {

    private _store$: BehaviorSubject<Array<ProductModel>> = new BehaviorSubject<Array<ProductModel>>([]);

    private forceUpdate$: BehaviorSubject<null> = new BehaviorSubject<null>(null);

    private updateProducts$: Observable<Array<ProductModel>> = this.forceUpdate$.pipe(
        switchMap(() => productTransport.getProducts()),
        tap((products: Array<ProductModel>) => this._store$.next(products))
    );

    readonly products$: Observable<Array<ProductModel>> = this._store$.asObservable();

    constructor() {
        this.updateProducts$.subscribe();
    }

    triggerUpdate(): void {
        this.forceUpdate$.next(null);
    }

}

export const productService = new ProductService();
