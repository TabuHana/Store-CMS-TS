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
    tableName: 'item',
    timestamps: true,
    freezeTableNames: true,
    underscored: true,
})
export class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
    /**
     * PK
     */
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare item_id: CreationOptional<number>;
    
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
    @HasOne(() => Stock, 'item_id')
    declare stock: NonAttribute<Stock>;

    @BelongsToMany(() => Category, {
        through: 'item_category',
    })
    declare item_category_id?: NonAttribute<Category[]>

    @BelongsToMany(() => Color, {
        through: 'item_color',
    })
    declare item_color_id?: NonAttribute<Color[]>
    
}

export default Item