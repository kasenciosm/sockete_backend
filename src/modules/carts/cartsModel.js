import { Model, DataTypes } from "sequelize";

class CartModel extends Model {
    static associate(models) {
        this.hasMany(models.products, {
            foreignKey: 'cart_id',
        })
        this.belongsTo(models.users, {
            foreignKey: 'user_id',
            targetKey: 'id'
        })
    }
    static init(sequelize) {
        return super.init(
            {
                order_number: {
                    type: DataTypes.INTEGER
                },
                product_details: {
                    type: DataTypes.JSONB
                },
                total_price: {
                    type: DataTypes.FLOAT
                },
                status: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true
                },
            },
            {
                sequelize,
                tableName: 'carts',
                modelName: 'carts'
            }
        )
    }
}

export default CartModel