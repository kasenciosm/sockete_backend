import { Model, DataTypes } from "sequelize";
class UserModel extends Model {
    static associate(models) {
        this.hasOne(models.carts, {
            foreignKey: 'user_id'
        })
    }
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING,
                },
                last_name: {
                    type: DataTypes.STRING,
                },
                username: {
                    type: DataTypes.STRING,
                },
                email: {
                    type: DataTypes.STRING,
                },
                password: {
                    type: DataTypes.STRING,
                },
                status: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true,
                }
            },
            {
                sequelize,
                tableName: 'users',
                modelName: 'users',
            }
        )
    }

}

export default UserModel;