import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
//@ts-ignore
import { Attribute, PrimaryKey, NotNull, Default, Table, CreatedAt, UpdatedAt, AutoIncrement } from '@sequelize/core/decorators-legacy';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefg0123456789', 10);


@Table({
    tableName: 'order',
    timestamps: true,
    underscored: true
})
export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.FLOAT)
  @NotNull
  declare sub_total: number;

  @Attribute(DataTypes.FLOAT)
  @NotNull
  declare total: string;

//   @Attribute(DataTypes.STRING)
//   @NotNull
//   declare shipping_address: string;

//   @Attribute(DataTypes.STRING)
//   @NotNull
//   declare billing_address: string;

//   @Attribute(DataTypes.BOOLEAN)
//   @Default(false)
//   declare status: boolean;
  
  @Attribute(DataTypes.DATE)
  @CreatedAt
  declare createdAt: CreationOptional<Date>

  @Attribute(DataTypes.DATE)
  @UpdatedAt
  declare updatedAt: CreationOptional<Date>

  @Attribute(DataTypes.STRING)
  @NotNull
  declare user_id: string;
}