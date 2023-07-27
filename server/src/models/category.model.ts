import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/connect';

export interface CategoryAttributes {
    id: number;
    name: string;
}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
    declare id: number;
    declare name: string;
    static associate(models: any) {}
}

Category.init(
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
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        tableName: 'category',
    }
);
export default Category;
