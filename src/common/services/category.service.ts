import { CategoryModel } from 'common/models';
import { categoryTransport } from 'common/transports';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export class CategoryService {

    private setCategories$: BehaviorSubject<Array<CategoryModel>> = new BehaviorSubject<Array<CategoryModel>>([]);

    private forceUpdate$: BehaviorSubject<null> = new BehaviorSubject<null>(null);

    private updateCategories$: Observable<Array<CategoryModel>> = this.forceUpdate$.pipe(
        switchMap(() => categoryTransport.getCategories()),
        tap((products: Array<CategoryModel>) => this.setCategories$.next(products))
    );

    readonly categories$: Observable<Array<CategoryModel>> = this.setCategories$.asObservable();

    constructor() {
        this.updateCategories$.subscribe();
    }

    triggerUpdate(): void {
        this.forceUpdate$.next(null);
    }

}

export const categoryService = new CategoryService();

