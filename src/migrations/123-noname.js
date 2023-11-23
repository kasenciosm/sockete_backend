'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "user_token" from table "carts"
 *
 **/

var info = {
    "revision": 123,
    "name": "noname",
    "created": "2023-11-20T20:17:39.210Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "removeColumn",
    params: ["carts", "user_token"]
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
