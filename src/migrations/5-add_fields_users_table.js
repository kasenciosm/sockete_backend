'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "username" to table "users"
 * changeColumn "category_id" on table "products"
 * changeColumn "category_id" on table "products"
 * changeColumn "category_id" on table "products"
 * changeColumn "category_id" on table "products"
 *
 **/

var info = {
    "revision": 5,
    "name": "add_fields_users_table",
    "created": "2023-11-13T02:33:42.552Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "users",
            "username",
            {
                "type": Sequelize.STRING,
                "field": "username"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "products",
            "category_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "categories",
                    "key": "id"
                },
                "allowNull": true,
                "field": "category_id"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "products",
            "category_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "categories",
                    "key": "id"
                },
                "allowNull": true,
                "field": "category_id"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "products",
            "category_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "categories",
                    "key": "id"
                },
                "allowNull": true,
                "field": "category_id"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "products",
            "category_id",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "categories",
                    "key": "id"
                },
                "allowNull": true,
                "field": "category_id"
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
