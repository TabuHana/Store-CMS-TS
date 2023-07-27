import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/connect';

export interface ColorAttributes {
    id: number;
    color: string;
    clothing_item_id: number;
}

class Color extends Model<ColorAttributes> implements ColorAttributes {
    declare id: number;
    declare color: string;
    declare clothing_item_id: number;
    static associate(models: any) {}
}

Color.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clothing_item_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "clothing_item",
                key: "id",
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        tableName: 'color',
    }
);
export default Color;
