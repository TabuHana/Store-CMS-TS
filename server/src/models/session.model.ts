import { DataTypes, Model, CreationOptional } from '@sequelize/core';
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

type SessionAttributes = {
    session_id: number;
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
    user_id: string;
};

export type SessionCreationAttributes = Omit<SessionAttributes, 'session_id' | 'valid' | 'createdAt' | 'updatedAt'>;

@Table({
    tableName: 'sessions',
    timestamps: true,
    freezeTableNames: true,
    underscored: true,
})
export class Session extends Model<SessionAttributes, SessionCreationAttributes> {
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

    /**
     * Associations
     */
    @Attribute(DataTypes.STRING)
    @ForeignKey
    @NotNull
    declare user_id: string;
}

export default Session;
