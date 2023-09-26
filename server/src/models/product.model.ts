import { DataTypes, Model, CreationOptional } from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    Table,
    CreatedAt,
    UpdatedAt,
    Unique,
    Default,
    ForeignKey,
    NotNull, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

type ProductAttributes = {
    id: string;
    name: string;
    description: string;
    price: number;
    price_per_unit: number;
    user_id: string;
    createdAt: Date;
    updatedAt: Date;
};

export type ProductCreationAttributes = Omit<ProductAttributes, 'id' | 'createdAt' | 'updatedAt'>;

@Table({
    tableName: 'product',
    timestamps: true,
    freezeTableNames: true,
    underscored: true,
})
export class Product extends Model<ProductAttributes, ProductCreationAttributes> {
    /**
     * PK
     */
    @Attribute(DataTypes.STRING)
    @PrimaryKey
    @NotNull
    @Unique
    @Default(() => nanoid())
    declare id: CreationOptional<string>;

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
}

export default Product;
