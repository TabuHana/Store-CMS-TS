// import { Model, DataTypes, CreationOptional } from 'sequelize';
import { Table, Model, Column, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { customAlphabet } from 'nanoid';
import sequelize from '../utils/connect';
import bcrypt from 'bcrypt';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

@Table({
    timestamps: true,
    tableName: 'user',
    freezeTableName: true
})
export class User extends Model<UserAttributes> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => nanoid()
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;


}



// class User extends Model<UserAttributes> implements UserAttributes {
//     declare id: string;
//     declare name: string;
//     declare email: string;
//     declare password: string;
//     declare createdAt: CreationOptional<Date>;
//     declare updatedAt: CreationOptional<Date>;
//     static associate(models: any) {}
// }

// User.init(
//     {
//         id: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             primaryKey: true,
//             defaultValue: () => nanoid(),
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//             validate: {
//                 isEmail: true,
//             },
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 min: 8,
//             },
//         },
//         createdAt: DataTypes.DATE,
//         updatedAt: DataTypes.DATE,
//     },
//     {
//         hooks: {
//             beforeCreate: async (user) => {
//                 const salt = await bcrypt.genSalt(10);
//                 const hash = bcrypt.hashSync(user.password, salt);

//                 user.password = hash;
//             },
//         },
//         sequelize,
//         timestamps: true,
//         freezeTableName: true,
//         underscored: true,
//         tableName: 'user',
//     }
// );

export default User;
