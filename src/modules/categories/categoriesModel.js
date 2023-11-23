import { Model, DataTypes } from "sequelize";

class CategoryModel extends Model {
    static associate(models) {
        this.hasMany(models.products, {
            foreignKey: 'category_id',
        })
    }
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING,
                },
                status: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true,
                }
            },
            {
                sequelize,
                tableName: 'categories',
                modelName: 'categories',
            }
        );
    }
}

export default CategoryModel;