import { TCategory, TImage, TProduct } from 'common/types';
import { deserialize, JsonName, JsonNameReadonly } from 'tserialize';
import { formatMoney } from 'utils';

const fallbackProductImage = require('assets/images/fallback-product-preview.png');

export class ProductModel {

    @JsonName('category', undefined, ProductModel.deserializeCategory)
    categoryId!: number;

    @JsonName()
    id!: number;

    @JsonName()
    name!: string;

    @JsonNameReadonly(undefined, ProductModel.deserializePreviewImage)
    previewImage?: string;

    @JsonName()
    price!: number;

    static deserializeCategory(value: TCategory | null): number {
        return value === null ? -1 : value.id;
    }

    static deserializePreviewImage(value: TImage | null): string | undefined {
        return value !== null ? value.hash : undefined;
    }

    static fromServer(data: TProduct): ProductModel {
        return deserialize(data, ProductModel);
    }

    get prettyPrice(): string {
        return formatMoney(this.price);
    }

    get productPreviewURL(): string {
        if (!this.previewImage) {
            return fallbackProductImage;
        }

        return `/static/preview-uploads/${this.previewImage}.png`;
    }

}
