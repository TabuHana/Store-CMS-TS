import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    Table,
    CreatedAt,
    UpdatedAt,
    AutoIncrement,
    HasOne,
    BelongsToMany,
    ForeignKey,
    NotNull, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';
import { Order } from './order.model';
import { Stock } from './stock.model';
import Category from './category.model';
import Color from './color.model';

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
    @HasOne(() => Stock, 'product_id')
    declare stock: NonAttribute<Stock>;

    @BelongsToMany(() => Category, {
        through: 'product_category',
    })
    declare product_category_id?: NonAttribute<Category[]>

    @BelongsToMany(() => Color, {
        through: 'product_color',
    })
    declare product_color_id?: NonAttribute<Color[]>
    
}

export default Product