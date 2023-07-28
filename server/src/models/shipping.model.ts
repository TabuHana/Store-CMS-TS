import { Table, Model, Column, DataType, AllowNull, Default, PrimaryKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { customAlphabet } from 'nanoid';
import { Optional } from 'sequelize';

const nanoid = customAlphabet('abcdefg0123456789', 10);

export interface ShippingInput {
    name: string;
    price: number;
    personal_cost: number;
}

interface ShippingAttributes extends ShippingInput {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ShippingCreationAttributes extends Optional<ShippingAttributes, 'createdAt' | 'updatedAt'> {}

@Table({
    tableName: 'shipping',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
})
export class Shipping extends Model<ShippingAttributes, ShippingCreationAttributes> {
    @Column(DataType.STRING)
    @AllowNull(false)
    @PrimaryKey
    @Default(() => `shipping_${nanoid()}`)
    id!: string;

    @Column(DataType.STRING)
    @AllowNull(false)
    name!: string;

    @Column(DataType.INTEGER)
    @AllowNull(false)
    price!: number;

    @Column(DataType.INTEGER)
    @AllowNull(false)
    personal_cost!: number;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

export default Shipping;
