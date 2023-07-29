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
    Table,
    AutoIncrement,
    BelongsToMany, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';
import Item from './item.model';

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

    @BelongsToMany(() => Item, {
        through: 'itemCategory'
    })
    declare item_category?: NonAttribute<Item[]>;
}

export default Category;
