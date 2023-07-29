import { Table, Model, Column, DataType, AllowNull, Default, HasOne, ForeignKey } from 'sequelize-typescript';
import Item from './item.model';

export interface StockInput {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    item: Item;
}

interface StockAttributes extends StockInput {
    id: number;
}

@Table({
    tableName: 'stock',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
})
export class Stock extends Model<StockAttributes> {
    @AllowNull(false)
    @Default(0)
    @Column(DataType.INTEGER)
    xs!: number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.INTEGER)
    s!: number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.INTEGER)
    m!: number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.INTEGER)
    l!: number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.INTEGER)
    xl!: number;

    @ForeignKey(()=> Item)
    @Column(DataType.INTEGER)
    item_id!: string;
    @HasOne(() => Item, 'item_id')
    item!: Item;
}

export default Stock;
