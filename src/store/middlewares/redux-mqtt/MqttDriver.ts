import { Store } from 'redux';
import mqtt, { IClientOptions, ClientSubscribeCallback, OnMessageCallback, MqttClient, OnErrorCallback } from 'mqtt';

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


export default class MqttDriver {
  private client: MqttClient;

  constructor({
    port = process.env.MQTT_PORT,
    host = process.env.MQTT_HOST,
    protocol = process.env.MQTT_PROTOCOL,
    rejectUnauthorized = false,
  }: IClientOptions = {}) {
    this.client = mqtt.connect({
      port,
      host,
      protocol,
      rejectUnauthorized,
    });
  }

  onConnect(callback: Function) {
    this.client.on('connect', callback);

    return this;
  }

  onError(callback: OnErrorCallback) {
    this.client.on('error', callback);

    return this;
  }
}
