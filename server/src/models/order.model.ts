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
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { customAlphabet } from 'nanoid';
import User from './user.model';
import Item from './item.model';
import orderedItems from './orderedItems.model';

const nanoid = customAlphabet('abcdefg0123456789', 10);

export interface OrderInput {
    total: number;
    items: Item[];
    shipping_address: string;
    billing_address: string;
    order_status: boolean;
    user_id: number;
    createdAt: Date;
    updatedAt: Date;
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
    @Column(DataType.STRING)
    @AllowNull(false)
    @Default(() => `order_${nanoid()}`)
    id!: string;

    @Column(DataType.FLOAT)
    @AllowNull(false)
    total!: string;

    @BelongsToMany(() => Item, () => orderedItems)
    @AllowNull(false)
    items!: Item[];

    @Column(DataType.STRING)
    @AllowNull(false)
    shipping_address!: string;

    @Column(DataType.STRING)
    @AllowNull(false)
    billing_address!: string;

    @Column(DataType.BOOLEAN)
    @AllowNull(false)
    @Default(false)
    order_status!: boolean;

    @BelongsTo(() => User, 'id')
    @Column(DataType.STRING)
    @AllowNull(false)
    user_id!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default Order;
