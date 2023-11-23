'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "total_price" to table "carts"
 * addColumn "product_prices" to table "carts"
 *
 **/

var info = {
    "revision": 124,
    "name": "add_fields_prices",
    "created": "2023-11-21T19:47:00.538Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "carts",
            "total_price",
            {
                "type": Sequelize.FLOAT,
                "field": "total_price"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "carts",
            "product_prices",
            {
                "type": Sequelize.FLOAT,
                "field": "product_prices"
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
