const ws = require('./config/websocket');
const processorService = require('./service/processor.service');

ws.on('message', (data) => {
    processorService.process(data);
});

ws.on('error', (err) => {
    console.error(err);
});