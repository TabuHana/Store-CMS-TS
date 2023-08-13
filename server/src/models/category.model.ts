import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    Table,
    AutoIncrement, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';

@Table({
    tableName: 'category',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
})
export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    /**
     * PK
     */
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare category_id: CreationOptional<number>;

    /**
     * Attribute
     */
    @Attribute(DataTypes.STRING)
    declare name: string;

    // Associations
}

export default Category;
