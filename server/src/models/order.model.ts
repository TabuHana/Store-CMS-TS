import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute,
} from '@sequelize/core';
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
import { Item } from './item.model';

const nanoid = customAlphabet('abcdefg0123456789', 10);

@Table({
    tableName: 'order',
    timestamps: true,
    underscored: true,
})
export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    /**
     * PK
     */
    @Attribute(DataTypes.STRING)
    @PrimaryKey
    @NotNull
    @Default(() => nanoid())
    declare order_id: CreationOptional<string>;

    /**
     * Attributes
     */
    @Attribute(DataTypes.FLOAT)
    @NotNull
    declare sub_total: number;

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
    @Attribute(DataTypes.STRING)
    @ForeignKey
    @NotNull
    declare user_id: string;

    @Attribute(DataTypes.STRING)
    @ForeignKey
    @NotNull
    declare customer_id: string;

    @BelongsToMany(() => Item, {
        through: 'order_cart',
    })
    declare orderCart?: NonAttribute<Item[]>
}

export default Order
