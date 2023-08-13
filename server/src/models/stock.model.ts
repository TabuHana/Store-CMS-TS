import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
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
    @Default(2)
    declare s: number;

    @Attribute(DataTypes.INTEGER)
    @Default(2)
    declare m: number;

    @Attribute(DataTypes.INTEGER)
    @Default(2)
    declare l: number;

    @Attribute(DataTypes.INTEGER)
    @Default(2)
    declare xl: number;

    @Attribute(DataTypes.INTEGER)
    @Default(2)
    declare xxl: number;

    @Attribute(DataTypes.STRING)
    declare color: string;

    /**
     * Associations
     */
    @Attribute(DataTypes.INTEGER)
    @ForeignKey
    @NotNull
    declare product_id: number;
}

export default Stock;
