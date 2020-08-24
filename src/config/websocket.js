const WebSocket = require('ws');
const debug = require('debug')('app');

const endpoint = process.env.ENDPOINT;
const UserName = process.env.USER_NAME;
const Authorization = process.env.TOKEN;
const Topic = process.env.TOPIC;

debug(endpoint, UserName, Topic);

module.exports = new WebSocket(endpoint, {
    headers: {
        UserName,
        Authorization,
        Topic
    }
});