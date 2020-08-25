const ws = require('./config/websocket');
const processorService = require('./service/processor.service');

ws.on('message', async (data) => {
    await processorService.process(data);
});

ws.on('error', (err) => {
    console.error(err);
});