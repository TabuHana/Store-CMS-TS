import { DataTypes, Model, CreationOptional, NonAttribute } from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    NotNull,
    Default,
    Table,
    CreatedAt,
    UpdatedAt,
    BelongsToMany,
    ForeignKey, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';
import { customAlphabet } from 'nanoid';
import { Product } from './product.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

type OrderAttributes = {
    id: string;
    sub_total: string;
    total: string;
    shipping_address: string;
    billing_address: string;
    status: boolean;
    user_id: string;
    customer_id: string;
    createdAt: Date;
    updatedAt: Date;
};

export type OrderCreationAttributes = Omit<OrderAttributes, 'id' | 'createdAt' | 'updatedAt'>;

@Table({
    tableName: 'order',
    timestamps: true,
    underscored: true,
})
export class Order extends Model<OrderAttributes, OrderCreationAttributes> {
    /**
     * PK
     */
    @Attribute(DataTypes.STRING)
    @PrimaryKey
    @NotNull
    @Default(() => nanoid())
    declare id: CreationOptional<string>;

    /**
     * Attributes
     */
    @Attribute(DataTypes.FLOAT)
    @NotNull
    declare sub_total: string;

    @Attribute(DataTypes.FLOAT)
    @NotNull
    declare total: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare shipping_address: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare billing_address: string;

    @Attribute(DataTypes.BOOLEAN)
    @Default(false)
    declare status: boolean;

    @Attribute(DataTypes.DATE)
    @CreatedAt
    declare createdAt: CreationOptional<Date>;

    @Attribute(DataTypes.DATE)
    @UpdatedAt
    declare updatedAt: CreationOptional<Date>;

    /**
     * Associations
     */
    @Attribute(DataTypes.INTEGER)
    @ForeignKey
    @NotNull
    declare customer_id: string;

    @Attribute(DataTypes.STRING)
    @ForeignKey
    @NotNull
    declare user_id: string;

    @BelongsToMany(() => Product, {
        through: 'order_cart',
    })
    declare orderCart?: NonAttribute<Product[]>;
}

export default Order;
