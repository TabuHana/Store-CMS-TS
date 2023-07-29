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
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import Category from './category.model';
import Color from './color.model';
import Stock from './stock.model';
import ItemCategory from './itemCategories.model';
import OrderedItems from './orderedItems.model';
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
    orders: Order[];
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
    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    description!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    price!: number;

    @AllowNull(true)
    @Default(0)
    @Column(DataType.INTEGER)
    price_per_unit!: number;

    // @BelongsToMany(() => Category, () => ItemCategory)
    // categories?: Category[];

    // @ForeignKey(() => Color)
    // @Column(DataType.INTEGER)
    // color_id!: number;
    
    // @BelongsTo(() => Color, 'color_id')
    // color!: Color;

    // @HasOne(() => Stock, 'stock_id')
    // @Column(DataType.INTEGER)
    // stock!: Stock;

    @BelongsToMany(() => Order, () => OrderedItems)
    orders?: Order[];

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default Item;
