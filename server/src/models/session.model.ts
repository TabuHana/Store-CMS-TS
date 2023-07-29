import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    Default,
    Table,
    CreatedAt,
    UpdatedAt,
    AutoIncrement,
    ForeignKey,
    NotNull, //@ts-expect-error
} from '@sequelize/core/decorators-legacy';

@Table({
    tableName: 'sessions',
    timestamps: true,
    freezeTableNames: true,
    underscored: true,
})
export class Session extends Model<InferAttributes<Session>, InferCreationAttributes<Session>> {
    /**
     * PK
     */
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare session_id: CreationOptional<number>;

    /**
     * Attribute
     */
    @Attribute(DataTypes.STRING)
    @ForeignKey
    @NotNull
    declare user_id: string;

    @Attribute(DataTypes.BOOLEAN)
    @Default(true)
    declare valid: boolean;

    @Attribute(DataTypes.STRING)
    declare userAgent: string;

    @Attribute(DataTypes.DATE)
    @CreatedAt
    declare createdAt: CreationOptional<Date>;

    @Attribute(DataTypes.DATE)
    @UpdatedAt
    declare updatedAt: CreationOptional<Date>;
}

export default Session