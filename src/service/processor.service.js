const presence = require('../proto/presence_pb');

async function process(data) {
    try {
        console.log(data);  
        var bytes = Array.prototype.slice.call(data, 0)
        const message = presence.presence_event.deserializeBinary(bytes);
        console.log(JSON.stringify(message, null, "\t"));
    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    process
}