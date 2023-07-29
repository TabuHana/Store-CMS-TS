import { Table, Model, Column, DataType, AllowNull, Default, HasOne } from 'sequelize-typescript';
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
    @Column(DataType.INTEGER)
    @AllowNull(false)
    @Default(0)
    xs!: number;

    @Column(DataType.INTEGER)
    @AllowNull(false)
    @Default(0)
    s!: number;

    @Column(DataType.INTEGER)
    @AllowNull(false)
    @Default(0)
    m!: number;

    @Column(DataType.INTEGER)
    @AllowNull(false)
    @Default(0)
    l!: number;

    @Column(DataType.INTEGER)
    @AllowNull(false)
    @Default(0)
    xl!: number;

    @HasOne(() => Item, 'item_id')
    item!: Item;
}

export default Stock;
