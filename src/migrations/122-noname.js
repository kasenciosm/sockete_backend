'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "user_token" to table "carts"
 *
 **/

var info = {
    "revision": 122,
    "name": "noname",
    "created": "2023-11-20T19:40:53.829Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "carts",
        "user_token",
        {
            "type": Sequelize.STRING,
            "field": "user_token"
        }
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
