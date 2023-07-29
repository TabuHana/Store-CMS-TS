import {
    Table,
    Model,
    Column,
    DataType,
    CreatedAt,
    UpdatedAt,
    AllowNull,
    IsEmail,
    Length,
    PrimaryKey,
    Default,
    BeforeCreate,
    HasMany,
    BeforeValidate,
    ForeignKey,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { customAlphabet } from 'nanoid';
import bcrypt from 'bcrypt';
import Order from './order.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface UserInput {
    name: string;
    email: string;
    password: string;
}

interface UserAttributes extends UserInput {
    id: string;
    purchases: Order[]
    createdAt: Date;
    updatedAt: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'createdAt' | 'updatedAt'> {}

@Table({
    tableName: 'user',
    timestamps: true,
    freezeTableName: true,
    underscored: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @PrimaryKey
    @AllowNull(false)
    @Default(() => nanoid())
    @Column(DataType.STRING)
    id!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    @AllowNull(false)
    @IsEmail
    @Column(DataType.STRING)
    email!: string;

    @AllowNull(false)
    @Length({ min: 8 })
    @Column(DataType.STRING)
    password!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

    @ForeignKey(() => Order)
    @Column(DataType.STRING)
    order_id!: Order;
    @HasMany(() => Order, 'order_id')
    purchases?: Order[];

    @BeforeCreate
    static beforeCreateHook(user: User): void {
        async () => {
            const salt = await bcrypt.genSalt(10);
            const hash = bcrypt.hashSync(user.password, salt);

            user.password = hash;
        };
    }

    @BeforeValidate
    static passwordCompare(user: User, candiditepassword: string) {
        async () => {
            bcrypt.compare(candiditepassword, user.password).catch((e) => false)
        }
    }
}

export default User;
