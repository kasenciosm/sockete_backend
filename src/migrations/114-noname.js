'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "cart_id" from table "products"
 * addColumn "order_number" to table "products"
 *
 **/

var info = {
    "revision": 114,
    "name": "noname",
    "created": "2023-11-19T17:45:27.644Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["products", "cart_id"]
    },
    {
        fn: "addColumn",
        params: [
            "products",
            "order_number",
            {
                "type": Sequelize.INTEGER,
                "field": "order_number",
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
