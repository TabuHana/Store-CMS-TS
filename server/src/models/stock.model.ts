import { Table, Model, Column, DataType, AllowNull, Default } from 'sequelize-typescript';

export interface StockInput {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
}

interface StockAttributes extends StockInput {
    id: number;
    color_id: number;
    item_id: number;
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
    xs!: number

    @Column(DataType.INTEGER)
    @AllowNull(false)
    @Default(0)
    s!: number

    @Column(DataType.INTEGER)
    @AllowNull(false)
    @Default(0)
    m!: number

    @Column(DataType.INTEGER)
    @AllowNull(false)
    @Default(0)
    l!: number

    @Column(DataType.INTEGER)
    @AllowNull(false)
    @Default(0)
    xl!: number

}

//     {
//         color_id: {
//             type: DataTypes.INTEGER,
//             allowNull: true,
//             references: {
//                 model: 'color',
//                 key: 'id',
//             },
//         },
//         item_id: {
//             type: DataTypes.INTEGER,
//             allowNull: true,
//             references: {
//                 model: 'clothing_item',
//                 key: 'id',


export default Stock;
