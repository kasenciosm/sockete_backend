'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "product_id" from table "carts"
 * removeColumn "quantity" from table "carts"
 * removeColumn "price" from table "carts"
 * removeColumn "order_number" from table "products"
 * addColumn "cart_id" to table "products"
 *
 **/

var info = {
    "revision": 116,
    "name": "noname",
    "created": "2023-11-19T22:26:50.170Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["carts", "product_id"]
    },
    {
        fn: "removeColumn",
        params: ["carts", "quantity"]
    },
    {
        fn: "removeColumn",
        params: ["carts", "price"]
    },
    {
        fn: "removeColumn",
        params: ["products", "order_number"]
    },
    {
        fn: "addColumn",
        params: [
            "products",
            "cart_id",
            {
                "type": Sequelize.INTEGER,
                "field": "cart_id",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "carts",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    }
];

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
