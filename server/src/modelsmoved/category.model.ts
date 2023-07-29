import { Table, Model, Column, DataType, AllowNull, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import Item from './item.model';
import ItemCategory from './itemCategories.model';

export interface CategoryInput {
    name: string;
    items: Item[];
}

interface CategoryAttributes extends CategoryInput {
    id: number;
}

@Table({
    tableName: 'category',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
})
export class Category extends Model<CategoryAttributes> {
    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    @BelongsToMany(() => Item, () => ItemCategory)
    items?: Item[];
}

export default Category;
