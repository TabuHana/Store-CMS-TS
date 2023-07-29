import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    Table,
    CreatedAt,
    UpdatedAt,
    AutoIncrement,
    HasOne,
    NotNull, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';
import { Order } from './order.model';
import { Stock } from './stock.model';

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
    declare cart?: NonAttribute<Order[]>;

    @HasOne(() => Stock, {
        foreignKey: 'item_id',
        inverse: {
            as: 'inventory_id',
        },
    })
    declare inventory: NonAttribute<Stock>;

    // Missing associations to category(m - m) and color(o - m)
}

export default Item