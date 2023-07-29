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
    @Column(DataType.STRING)
    @AllowNull(false)
    @Default(() => nanoid())
    id!: string;

    @Column(DataType.STRING)
    @AllowNull(false)
    name!: string;

    @Column(DataType.STRING)
    @AllowNull(false)
    @IsEmail
    email!: string;

    @Column(DataType.STRING)
    @AllowNull(false)
    @Length({ min: 8 })
    password!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

    @HasMany(() => Order)
    orders?: Order[];

    @BeforeCreate
    static beforeCreateHook(instance: User): void {
        async (user: User) => {
            const salt = await bcrypt.genSalt(10);
            const hash = bcrypt.hashSync(user.password, salt);

            user.password = hash;
        };
    }
}

export default User;
