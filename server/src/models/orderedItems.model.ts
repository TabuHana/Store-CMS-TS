import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import Item from './item.model';
import Category from './category.model';

interface orderedItemsAttributes {
    id: number;
    item_id: number;
    category_id: number;
}

@Table({
    tableName: 'ordered_items',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
})
export class orderedItems extends Model<orderedItemsAttributes> {
    @ForeignKey(() => Item)
    @Column(DataType.INTEGER)
    item_id!: number;

    @ForeignKey(() => Category)
    @Column(DataType.INTEGER)
    category_id!: number;
}

export default orderedItems;
