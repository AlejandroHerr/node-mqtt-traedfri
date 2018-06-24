import { MqttClient, IClientSubscribeOptions, Packet, ISubscriptionGrant, IClientPublishOptions } from 'mqtt';

export const asyncSubscribe = (
  client: MqttClient,
  topic: string | Array<string>,
  options:IClientSubscribeOptions,
): Promise<Array<ISubscriptionGrant>|Error> => new Promise((resolve) => {
  client.subscribe(topic, options, (error: Error, granted: Array<ISubscriptionGrant>) => {
    if (error) {
      return resolve(error);
    }

    return resolve(granted);
  });
});

export const asyncUnsubscribe = (
  client: MqttClient,
  topic:string | Array<string>,
): Promise<Packet|Error> => new Promise((resolve) => {
  client.unsubscribe(topic, (error: Error, packet: Packet) => {
    if (error) {
      return resolve(error);
    }

    return resolve(packet);
  });
});

export const asyncPublish = (
  client: MqttClient,
  topic: string,
  message: string | Buffer,
  options: IClientPublishOptions,
): Promise<Packet|Error> => new Promise((resolve) => {
  client.publish(topic, message, options, (error: Error, packet: Packet) => {
    if (error) {
      return resolve(error);
    }

    return resolve(packet);
  });
});
