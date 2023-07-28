import { Table, Model, Column, DataType, AllowNull, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Optional } from 'sequelize';

export interface ItemInput {
    name: string;
    price: number;
    description: string;
    price_per_unit: number;
    category_id: number;
}

interface ItemAttributes extends ItemInput {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

interface ItemCreationAttributes extends Optional<ItemAttributes, 'createdAt' | 'updatedAt'> {}

@Table({
    tableName: 'item',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
})
export class Item extends Model<ItemAttributes, ItemCreationAttributes> {
    @Column(DataType.STRING)
    @AllowNull(false)
    name!: string;

    @Column(DataType.INTEGER)
    @AllowNull(false)
    price!: number;

    @Column(DataType.STRING)
    @AllowNull(false)
    description!: string;

    @Column(DataType.INTEGER)
    @AllowNull(true)
    @Default(0)
    price_per_unit!: number;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

// category_id: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     references: {
//         model: 'category',
//         key: 'id',
//     },

export default Item;
