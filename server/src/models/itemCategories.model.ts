import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import Item from './item.model';
import Category from './category.model';

interface ItemCategoryAttributes {
    id: number;
    item_id: number;
    category_id: number;
}

@Table({
    tableName: 'item_category',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
})
export class ItemCategory extends Model<ItemCategoryAttributes> {
    @ForeignKey(() => Item)
    @Column(DataType.INTEGER)
    item_id!: number;

    @ForeignKey(() => Category)
    @Column(DataType.INTEGER)
    category_id!: number;
}

export default ItemCategory;
