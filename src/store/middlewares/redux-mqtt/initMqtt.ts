import { Store } from 'redux';
import mqtt, { IClientOptions, ClientSubscribeCallback, OnMessageCallback } from 'mqtt';

import { clientConnected, clientError } from './actions';
import logger from '../../../services/logger';

const initMqtt = ({
  port = process.env.MQTT_PORT,
  host = process.env.MQTT_HOST,
  protocol = process.env.MQTT_PROTOCOL,
  rejectUnauthorized = false,
}: IClientOptions = {}) => {
  const client = mqtt.connect({
    port,
    host,
    protocol,
    rejectUnauthorized,
  });

  return client;
};

export default initMqtt;
