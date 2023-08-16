import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute,
    BelongsToManyGetAssociationsMixin,
    BelongsToManySetAssociationsMixin,
} from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    Table,
    CreatedAt,
    UpdatedAt,
    AutoIncrement,
    HasMany,
    ForeignKey,
    BelongsToMany,
    NotNull, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';
import { Stock } from './stock.model';
import Category from './category.model';

@Table({
    tableName: 'product',
    timestamps: true,
    freezeTableNames: true,
    underscored: true,
})
export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    /**
     * PK
     */
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare product_id: CreationOptional<number>;

    /**
     * Attributes
     */
    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare description: string;

    @Attribute(DataTypes.FLOAT)
    @NotNull
    declare price: number;

    @Attribute(DataTypes.FLOAT)
    @NotNull
    declare price_per_unit: number;

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

    @HasMany(() => Stock, 'product_id')
    declare stock: Stock[];

    @BelongsToMany(() => Category, {
        through: 'product_category',
    })
    declare product_category_id?: NonAttribute<Category[]>;

    declare getCategories: BelongsToManyGetAssociationsMixin<Category>;

    declare setCategories: BelongsToManySetAssociationsMixin<Category, Category['category_id']>;
}

export default Product;
