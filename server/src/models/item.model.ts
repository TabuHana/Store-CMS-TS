import { Model, DataTypes, CreationOptional } from 'sequelize';
import sequelize from '../utils/connect';

export interface ItemAttributes {
    id: number;
    name: string;
    price: number;
    description: string;
    price_per_unit: string;
    category_id: number;
    createdAt: Date;
    updatedAt: Date;
}

class Item extends Model<ItemAttributes> implements ItemAttributes {
    declare id: number;
    declare name: string;
    declare price: number;
    declare description: string;
    declare price_per_unit: string;
    declare category_id: number;
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    static associate(models: any) {}
}

Item.init(
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
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price_per_unit: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: "0",
        },
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "category",
            key: "id",
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        tableName: 'item',
    }
);
export default Item;
