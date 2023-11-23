'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "orders", deps: [carts, products]
 *
 **/

var info = {
    "revision": 100,
    "name": "create_orders_table",
    "created": "2023-11-18T00:02:19.945Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "orders",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true
            },
            "carts_id": {
                "type": Sequelize.INTEGER,
                "field": "carts_id",
                "allowNull": false,
                "references": {
                    "model": "carts",
                    "key": "id"
                }
            },
            "product_id": {
                "type": Sequelize.INTEGER,
                "field": "product_id",
                "allowNull": false,
                "references": {
                    "model": "products",
                    "key": "id"
                }
            },
            "created_at": {
                "type": Sequelize.DATE,
                "field": "created_at",
                "allowNull": false
            },
            "updated_at": {
                "type": Sequelize.DATE,
                "field": "updated_at",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
