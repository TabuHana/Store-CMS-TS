import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import Item from './item.model';
import Order from './order.model';

interface OrderedItemsAttributes {
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
export class OrderedItems extends Model<OrderedItemsAttributes> {
    @ForeignKey(() => Item)
    @Column(DataType.INTEGER)
    item_id!: number;

    @ForeignKey(() => Order)
    @Column(DataType.INTEGER)
    order_id!: number;
}

export default OrderedItems;
