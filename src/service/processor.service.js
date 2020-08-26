const presence = require('../proto/presence_pb');
const streaming = require('../proto/streaming_pb');
const debug = require('debug')('app');
const moment = require('moment');
const dataArray = [];

const startTime = moment();

async function process(data) {
    try {
        dataArray.push(data.length);

        const meanMessageSize = Math.floor(dataArray.reduce((prev, next) => prev + next, 0) / dataArray.length);
        const totalTimeSeconds = moment.duration(moment().diff(startTime)).seconds();
        const totalTime = totalTimeSeconds > 0 ? totalTimeSeconds : 1;
        const messagesPerSecond = dataArray.length / totalTime;
        debug(`Tamanho medio de mensagem: ${meanMessageSize} bytes`);
        debug(`Quantidade por mensagens por segundo: ${messagesPerSecond}`);
        debug(`Tempo decorrido desde o início do teste: ${totalTime} segundos`);

        const msgProto = streaming.MsgProto.deserializeBinary(data);
        if (msgProto.getSubject() === 'presence') {
            const message = presence.presence_event.deserializeBinary(msgProto.getData());
            const jsonMessage = message.toObject();
            let deviceInfoList = [];
            if (jsonMessage.eventType == 1) {
                deviceInfoList = jsonMessage.paRssiEvent.rssiList;
            }
            if (jsonMessage.eventType == 2) {
                deviceInfoList = jsonMessage.paProximityEvent.proximityList;
            }
            const macAddressList = deviceInfoList.map(deviceInfo => Buffer.from(deviceInfo.staEthMac.addr, 'base64').toString());
            debug(`Quantidade de Entradas de MacAddress ${deviceInfoList.length}`);
            debug(`MacAddress ${macAddressList}`);

        }
        debug('\n\n\n');

    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    process
}