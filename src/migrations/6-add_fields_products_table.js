'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "user_id" to table "users"
 * addColumn "user_id" to table "products"
 *
 **/

var info = {
    "revision": 6,
    "name": "add_fields_products_table",
    "created": "2023-11-15T15:54:07.400Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "users",
            "user_id",
            {
                "type": Sequelize.INTEGER,
                "field": "user_id",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "users",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "products",
            "user_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "NO ACTION",
                "references": {
                    "model": "users",
                    "key": "id"
                },
                "allowNull": true,
                "field": "user_id"
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
