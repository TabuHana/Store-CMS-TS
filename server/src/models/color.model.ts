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
    HasOne,
    BelongsToMany, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';
import Item from './item.model';
import Stock from './stock.model';

@Table({
    tableName: 'color',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
})
export class Color extends Model<InferAttributes<Color>, InferCreationAttributes<Color>> {
    /**
     * PK
     */
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare color_id: CreationOptional<number>;

    /**
     * Attribute
     */
    @Attribute(DataTypes.STRING)
    declare name: string;

    // Associations
    @HasOne(() => Stock, 'color_id')
    declare stock: NonAttribute<Stock>;
}

export default Color;
