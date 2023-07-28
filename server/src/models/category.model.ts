import { Table, Model, Column, DataType, AllowNull, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';

export interface CategoryInput {
    name: string;
}

interface CategoryAttributes extends CategoryInput {
    id: number;
}

@Table({
    tableName: 'user',
    timestamps: true,
    freezeTableName: true,
    underscored: true
})
export class Category extends Model<CategoryAttributes> {
    @Column(DataType.STRING)
    @AllowNull(false)
    name!: string;
}

export default Category;
