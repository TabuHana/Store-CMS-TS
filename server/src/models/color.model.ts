import { Table, Model, Column, DataType, AllowNull, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Optional } from 'sequelize';

export interface ColorInput {
    color: string;
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
    color!: string;
}

//     clothing_item_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//             model: 'clothing_item',
//             key: 'id',
//         },
//     },
// },

export default Color;
