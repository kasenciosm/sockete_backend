import { Model, DataTypes } from 'sequelize'

class ProductModel extends Model {
    static associate(models) {
        this.belongsTo(models.categories, {
            foreignKey: 'category_id',
            targetKey: 'id',
        })
        this.belongsTo(models.carts, {
            foreignKey: 'cart_id',
            targetKey: 'id'
        })
    }
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING,
                },
                description: {
                    type: DataTypes.STRING,
                },
                price: {
                    type: DataTypes.FLOAT,
                },
                image: {
                    type: DataTypes.STRING,
                },
                category_id: {
                    type: DataTypes.INTEGER,
                },
                status: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true,
                },
            },
            {
                sequelize,
                tableName: 'products',
                modelName: 'products',
            }
        )
    }
}

export default ProductModel;