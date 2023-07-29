import { Table, Model, Column, DataType, AllowNull, BelongsToMany } from 'sequelize-typescript';
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
    timestamps: true,
    freezeTableName: true,
    underscored: true,
})
export class Category extends Model<CategoryAttributes> {
    @Column(DataType.STRING)
    @AllowNull(false)
    name!: string;

    @BelongsToMany(() => Item, () => ItemCategory)
    @Column(DataType.INTEGER)
    items?: Item[];
}

export default Category;
