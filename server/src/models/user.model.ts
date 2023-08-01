import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    NotNull,
    Default,
    Table,
    CreatedAt,
    UpdatedAt,
    BeforeCreate,
    Unique,
    HasMany, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';
import { IsEmail, Min } from '@sequelize/validator.js';
import { customAlphabet } from 'nanoid';
import bcrypt from 'bcrypt';
import { Order } from './order.model';
import { Session } from './session.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

type UserAttributes = {
    user_id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string, user: User): Promise<boolean>;
};

export type UserCreationAttributes = Omit<UserAttributes, 'user_id' | 'createdAt' | 'updatedAt' | 'comparePassword'>;

@Table({
    tableName: 'user',
    timestamps: true,
    freezeTableNames: true,
    underscored: true,
})
// <InferAttributes<User>, InferCreationAttributes<User>
export class User extends Model<UserAttributes, UserCreationAttributes> {
    /**
     * PK
     */
    @Attribute(DataTypes.STRING)
    @PrimaryKey
    @NotNull
    @Default(() => nanoid())
    declare user_id: CreationOptional<string>;

    /**
     * Attributes
     */
    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string;

    @Attribute(DataTypes.STRING)
    @IsEmail
    @Unique
    @NotNull
    declare email: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    @Min(6)
    declare password: string;

    @Attribute(DataTypes.DATE)
    @CreatedAt
    declare createdAt: CreationOptional<Date>;

    @Attribute(DataTypes.DATE)
    @UpdatedAt
    declare updatedAt: CreationOptional<Date>;

    /**
     * Associations
     */
    @HasMany(() => Session, 'user_id')
    declare sessions: Session[];

    @HasMany(() => Order, 'user_id')
    declare orders: Order[];

    /**
     * Methods
     */
    static comparePassword = async function (candaditepassword: string, user: User): Promise<boolean> {
        return bcrypt.compare(candaditepassword, user.password).catch((e) => false);
    };

    /**
     * Hooks
     */

    @BeforeCreate
    static async beforeCreateHook(user: User) {
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
    }
}

export default User;
