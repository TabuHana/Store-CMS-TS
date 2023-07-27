import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/connect';

export interface StockAttributes {
    id: number;
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    color_id: number;
    item_id: number;
}

class Stock extends Model<StockAttributes> implements StockAttributes {
    declare id: number;
    declare xs: number;
    declare s: number;
    declare m: number;
    declare l: number;
    declare xl: number;
    declare color_id: number;
    declare item_id: number;
    static associate(models: any) {}
}

Stock.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        xs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        s: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        m: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        l: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        xl: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        color_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'color',
                key: 'id',
            },
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'clothing_item',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        tableName: 'stock',
    }
);
export default Stock;
