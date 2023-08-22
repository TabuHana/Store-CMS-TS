import { DataTypes, Model, CreationOptional } from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    NotNull,
    AutoIncrement,
    Table,
    CreatedAt,
    UpdatedAt,
    Unique,
    ForeignKey,
    HasMany, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';
import { IsEmail } from '@sequelize/validator.js';

// export type CustomerUpdate = {
//     name: string;
//     email: string;
//     address: string;
// }

type CustomerAttributes = {
    id: number
    name: string;
    phone: string;
    email: string;
    address: string;
    user_id: string
    createdAt: Date;
    updatedAt: Date;
};

export type CustomerCreationAttributes = Omit<CustomerAttributes, 'id' | 'createdAt' | 'updatedAt'>;

@Table({
    tableName: 'customer',
    timestamps: true,
    freezeTableNames: true,
    underscored: true,
})
// <InferAttributes<User>, InferCreationAttributes<User>
export class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> {
    /**
     * PK
     */
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    /**
     * Attributes
     */
    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string;

    @Attribute(DataTypes.STRING)
    declare phone: string;

    @Attribute(DataTypes.STRING)
    @IsEmail
    @Unique
    declare email: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare address: string;

    @Attribute(DataTypes.DATE)
    @CreatedAt
    declare createdAt: CreationOptional<Date>;

    @Attribute(DataTypes.DATE)
    @UpdatedAt
    declare updatedAt: CreationOptional<Date>;

    /**
     * Associations
     */
    @Attribute(DataTypes.STRING)
    @ForeignKey
    @NotNull
    declare user_id: string;
}

export default Customer;
