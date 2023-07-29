import {
    Table,
    Model,
    Column,
    DataType,
    AllowNull,
    Default,
    CreatedAt,
    UpdatedAt,
    PrimaryKey,
    BelongsTo,
    BelongsToMany,
    ForeignKey,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { customAlphabet } from 'nanoid';
import User from './user.model';
import Item from './item.model';
import OrderedItems from './orderedItems.model';

const nanoid = customAlphabet('abcdefg0123456789', 10);

export interface OrderInput {
    total: number;
    cart: Item[];
    shipping_address: string;
    billing_address: string;
    order_status: boolean;
    user_id: number;
}

interface OrderAttributes extends OrderInput {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'createdAt' | 'updatedAt'> {}

@Table({
    timestamps: true,
    tableName: 'order',
    freezeTableName: true,
    underscored: true,
})
export class Order extends Model<OrderAttributes, OrderCreationAttributes> {
    @PrimaryKey
    @AllowNull(false)
    @Default(() => `order_${nanoid()}`)
    @Column(DataType.STRING)
    id!: string;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    total!: string;

    @BelongsToMany(() => Item, () => OrderedItems)
    cart!: Item[];

    @AllowNull(false)
    @Column(DataType.STRING)
    shipping_address!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    billing_address!: string;

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    order_status!: boolean;

    @ForeignKey(()=> User)
    @Column(DataType.STRING)
    user_id!: string;
    @BelongsTo(() => User, 'id')
    user!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default Order;
