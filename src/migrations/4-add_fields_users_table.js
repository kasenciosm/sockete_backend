'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "last_name" to table "users"
 * addColumn "email" to table "users"
 * addColumn "password" to table "users"
 * addColumn "status" to table "users"
 * changeColumn "status" on table "products"
 *
 **/

var info = {
    "revision": 4,
    "name": "add_fields_users_table",
    "created": "2023-11-08T02:44:19.020Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "users",
            "last_name",
            {
                "type": Sequelize.STRING,
                "field": "last_name"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "email",
            {
                "type": Sequelize.STRING,
                "field": "email"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "password",
            {
                "type": Sequelize.STRING,
                "field": "password"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "status",
            {
                "type": Sequelize.BOOLEAN,
                "field": "status",
                "defaultValue": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "products",
            "status",
            {
                "type": Sequelize.BOOLEAN,
                "field": "status",
                "defaultValue": true
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
