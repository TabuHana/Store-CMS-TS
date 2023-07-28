import {
    Table,
    Model,
    Column,
    DataType,
    AllowNull,
    Default,
    CreatedAt,
    UpdatedAt,
    PrimaryKey,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefg0123456789', 10);

export interface OrderInput {
    name: string;
    price: number;
    size: string;
    address: string;
    order_number: string;
    order_status: boolean;
    shipping_id: number;
    user_id: number;
    createdAt: Date;
    updatedAt: Date;
}

interface OrderAttributes extends OrderInput {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'createdAt' | 'updatedAt'> {}

@Table({
    timestamps: true,
    tableName: 'order',
    freezeTableName: true,
    underscored: true,
})
export class Order extends Model<OrderAttributes, OrderCreationAttributes> {
    @Column
    @PrimaryKey
    @AllowNull(false)
    @Default(() => `order_${nanoid()}`)
    id!: string;

    @Column(DataType.STRING)
    @AllowNull(false)
    name!: string;

    @Column(DataType.FLOAT)
    @AllowNull(false)
    price!: string;

    @Column(DataType.STRING)
    @AllowNull(false)
    size!: string;

    @Column(DataType.STRING)
    @AllowNull(false)
    address!: string;

    @Column(DataType.STRING)
    @AllowNull(false)
    order_number!: string;

    @Column(DataType.BOOLEAN)
    @AllowNull(false)
    order_status!: boolean;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

//         shipping_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'shipping',
//                 key: 'id',
//             },
//         },
//         user_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'user',
//                 key: 'id',
//             },
//         },
//         updatedAt: {
//             type: DataTypes.DATE,
//             allowNull: false,
//         },
//         createdAt: {
//             type: DataTypes.DATE,
//             allowNull: false,
//         },
//     },

export default Order;
