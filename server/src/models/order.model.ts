import { Model, DataTypes, CreationOptional } from 'sequelize';
import sequelize from '../utils/connect';

export interface OrderAttributes {
    id: string;
    name: string;
    price: number;
    size: string;
    address: string;
    order_number: string;
    order_status: boolean;
    category_name: string;
    shipping_id: number;
    user_id: number;
    createdAt: Date;
    updatedAt: Date;
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
    declare id: string;
    declare name: string;
    declare price: number;
    declare size: string;
    declare address: string;
    declare order_number: string;
    declare order_status: boolean;
    declare category_name: string;
    declare shipping_id: number;
    declare user_id: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    static associate(models: any) {}
}

Order.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        size: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        order_number: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        order_status: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        category_name: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: "none",
        },
        shipping_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "shipping",
            key: "id",
          },
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "user",
            key: "id",
          },
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        tableName: 'order',
    }
);
export default Order;
