import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
//@ts-ignore
import { Attribute, PrimaryKey, NotNull, Default, Table, CreatedAt, UpdatedAt, HasMany } from '@sequelize/core/decorators-legacy';
import { customAlphabet } from 'nanoid';
import { Order } from './order.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);


@Table({
    tableName: 'user',
    timestamps: true,
    freezeTableNames: true,
    underscored: true
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.STRING)
  @PrimaryKey
  @NotNull
  @Default(() => nanoid())
  declare id: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  declare email: string;

  @Attribute(DataTypes.DATE)
  @CreatedAt
  declare createdAt: CreationOptional<Date>

  @Attribute(DataTypes.DATE)
  @UpdatedAt
  declare updatedAt: CreationOptional<Date>

  @HasMany(() => Order, 'user_id')
  declare orders: Order[]
}