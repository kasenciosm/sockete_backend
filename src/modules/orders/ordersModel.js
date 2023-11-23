import { Model, DataTypes } from 'sequelize'

class OrderModel extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                carts_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'carts',
                        key: 'id',
                    },
                    allowNull: false,
                },
                product_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'products',
                        key: 'id',
                    },
                    allowNull: false,
                }
            },
            {
                sequelize,
                tableName: 'orders',
                modelName: 'orders'
            }
        )
    }
}

export default OrderModel