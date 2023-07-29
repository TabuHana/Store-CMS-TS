import { Table, Model, Column, DataType, AllowNull, BelongsToMany } from 'sequelize-typescript';
import Item from './item.model';

export interface ColorInput {
    name: string;
    items: Item[];
}

interface ColorAttributes extends ColorInput {
    id: number;
}

@Table({
    tableName: 'color',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
})
export class Color extends Model<ColorAttributes> {
    @Column(DataType.STRING)
    @AllowNull(false)
    name!: string;

    @BelongsToMany(() => Item, 'item_id')
    items?: Item[];
}

export default Color;
