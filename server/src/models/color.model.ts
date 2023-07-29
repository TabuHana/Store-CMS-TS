import { Table, Model, Column, DataType, AllowNull, BelongsToMany, ForeignKey, HasMany } from 'sequelize-typescript';
import Item from './item.model';

export interface ColorInput {
    color: string;
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
    @AllowNull(false)
    @Column(DataType.STRING)
    color!: string;


    // @HasMany(() => Item)
    // items?: Item[];
}

export default Color;
