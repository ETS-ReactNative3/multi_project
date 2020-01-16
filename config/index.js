const database = require('config/database');
const layout = require('config/layout');
const service = require('config/service');

module.exports = {
    port : process.env.API_SERVER_PORT,
    database,
    layout,
    service,
    jwt : {
        secretID : 'asdasw!@#ASdjshxwe.xfisdyf6%$qwsdahgsd#$'
    },
    file : {
        attribute : 'localhost'
    }
}