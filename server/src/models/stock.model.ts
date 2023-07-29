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
    Default,
    AutoIncrement,
    ForeignKey,
    NotNull, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';
import { Item } from './item.model';

@Table({
    tableName: 'stock',
    timestamps: false,
    freezeTableNames: true,
    underscored: true,
})
export class Stock extends Model<InferAttributes<Stock>, InferCreationAttributes<Stock>> {
    /**
     * PK
     */
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare stock_id: CreationOptional<number>;

    /**
     * Attributes
     */
    @Attribute(DataTypes.INTEGER)
    @Default(0)
    declare xs: number;

    @Attribute(DataTypes.INTEGER)
    @Default(0)
    declare s: number;

    @Attribute(DataTypes.INTEGER)
    @Default(0)
    declare m: number;

    @Attribute(DataTypes.INTEGER)
    @Default(0)
    declare l: number;

    @Attribute(DataTypes.INTEGER)
    @Default(0)
    declare xl: number;

    /**
     * Associations
     */
    @Attribute(DataTypes.INTEGER)
    @ForeignKey
    @NotNull
    declare item_id: number;
    
    @Attribute(DataTypes.INTEGER)
    @ForeignKey
    @NotNull
    declare color_id: number;
}

export default Stock;
