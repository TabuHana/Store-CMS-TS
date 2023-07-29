import {
    Table,
    Model,
    Column,
    DataType,
    AllowNull,
    Default,
    CreatedAt,
    UpdatedAt,
    HasOne,
    BelongsToMany,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import Category from './category.model';
import Color from './color.model';
import Stock from './stock.model';
import ItemCategory from './itemCategories.model';
import orderedItems from './orderedItems.model';
import Order from './order.model';

export interface ItemInput {
    name: string;
    description: string;
    price: number;
    price_per_unit: number;
    category_id: number;
    color_id: number;
    categories: Category[];
    color: Color;
    stock: Stock;
    order: Order;
}

interface ItemAttributes extends ItemInput {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

interface ItemCreationAttributes extends Optional<ItemAttributes, 'createdAt' | 'updatedAt'> {}

@Table({
    tableName: 'item',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
})
export class Item extends Model<ItemAttributes, ItemCreationAttributes> {
    @Column(DataType.STRING)
    @AllowNull(false)
    name!: string;

    @Column(DataType.STRING)
    @AllowNull(false)
    description!: string;

    @Column(DataType.INTEGER)
    @AllowNull(false)
    price!: number;

    @Column(DataType.INTEGER)
    @AllowNull(true)
    @Default(0)
    price_per_unit!: number;

    @BelongsToMany(() => Category, () => ItemCategory)
    @Column(DataType.INTEGER)
    categories?: Category[];

    @HasOne(() => Color, 'color_id')
    @Column(DataType.INTEGER)
    color!: Color;

    @HasOne(() => Stock, 'stock_id')
    @Column(DataType.INTEGER)
    stock!: Stock;

    @BelongsToMany(() => Order, () => orderedItems)
    @AllowNull(false)
    @Default(0)
    orders?: Order[];

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default Item;
