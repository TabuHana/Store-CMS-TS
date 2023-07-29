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
    HasMany, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';
import { customAlphabet } from 'nanoid';
import bcrypt from 'bcrypt';
import { Order } from './order.model';
import { Session } from './session.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

@Table({
    tableName: 'user',
    timestamps: true,
    freezeTableNames: true,
    underscored: true,
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
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
    declare email: string;

    @Attribute(DataTypes.STRING)
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
    @HasMany(() => Order, 'user_id')
    declare orders: Order[];

    @HasMany(() => Session, 'user_id')
    declare sessions: Session[];

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
    static beforeCreateHook(user: User): void {
        async () => {
            const salt = await bcrypt.genSalt(10);
            const hash = bcrypt.hashSync(user.password, salt);

            user.password = hash;
        };
    }
}

export default User;
