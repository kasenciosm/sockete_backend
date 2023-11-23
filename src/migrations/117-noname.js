'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "product_details" to table "carts"
 *
 **/

var info = {
    "revision": 117,
    "name": "noname",
    "created": "2023-11-19T23:29:52.415Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "carts",
        "product_details",
        {
            "type": Sequelize.JSONB,
            "field": "product_details"
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
