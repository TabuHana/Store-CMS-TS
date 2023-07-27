import { Model, DataTypes, CreationOptional } from 'sequelize';
import { customAlphabet } from 'nanoid';
import sequelize from '../utils/connect';

const nanoid = customAlphabet('abcdefg0123456789', 10);

export interface ShippingAttributes {
    id: string;
    name: string;
    price: number;
    personal_cost: number;
    createdAt: Date;
    updatedAt: Date;
}

class Shipping extends Model<ShippingAttributes> implements ShippingAttributes {
    declare id: string;
    declare name: string;
    declare price: number;
    declare personal_cost: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    static associate(models: any) {}
}

Shipping.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: () => nanoid(),
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        personal_cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        tableName: 'shipping',
    }
);
export default Shipping;
