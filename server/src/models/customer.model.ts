import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    NotNull,
    AutoIncrement,
    Table,
    CreatedAt,
    UpdatedAt,
    Unique,
    ForeignKey,
    HasMany, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';
import { IsEmail } from '@sequelize/validator.js';
import { Order } from './order.model';

type CustomerAttributes = {
    customer_id: string;
    name: string;
    email: string;
    billing_address: string;
    shipping_address: string;
    createdAt: Date;
    updatedAt: Date;
};

export type CustomerCreationAttributes = Omit<CustomerAttributes, 'createdAt' | 'updatedAt'>;

@Table({
    tableName: 'customer',
    timestamps: true,
    freezeTableNames: true,
    underscored: true,
})
// <InferAttributes<User>, InferCreationAttributes<User>
export class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> {
    /**
     * PK
     */
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare customer_id: CreationOptional<string>;

    /**
     * Attributes
     */
    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string;

    @Attribute(DataTypes.STRING)
    @IsEmail
    @Unique
    declare email: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare billing_address: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare shipping_address: string;

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

    @HasMany(() => Order, 'customer_id')
    declare orders: Order[];
}

export default Customer;