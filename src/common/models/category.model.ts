import { TCategory } from 'common/types';
import { deserialize, JsonName } from 'tserialize';

export class CategoryModel {

    @JsonName()
    id!: number;

    @JsonName()
    name!: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    static fromServer(data: TCategory): CategoryModel {
        return deserialize(data, CategoryModel);
    }

}
