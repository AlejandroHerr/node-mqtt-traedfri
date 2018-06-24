import {
  IClientSubscribeOptions,
  IClientPublishOptions,
  Packet,
  ISubscriptionGrant,
} from 'mqtt';
import { Action } from 'redux';

export type SubscribeTopic = string | Array<string>;
type PublisherTopic = string;
type Message = string | Buffer;

export type MessageCallback = (topic: string, payload: Buffer, packet: Packet) => Action;

type SubscribeSuccessCallback = (granted: Array<ISubscriptionGrant>, topic: SubscribeTopic) => Action;
type SubscribeFailureCallback = (error: Error, topic: SubscribeTopic | PublisherTopic) => Action;
type PacketSuccessCallback = (packer: Packet, topic: SubscribeTopic | PublisherTopic) => Action;
type PacketFailureCallback = (error: Error, topic: SubscribeTopic | PublisherTopic) => Action;

export interface IAddSubscribePayload {
  readonly topic: SubscribeTopic,
  readonly options?: IClientSubscribeOptions,
  readonly callback: MessageCallback,
}
export interface IAddSubscribeMeta {
  readonly successCallback?: SubscribeSuccessCallback,
  readonly failureCallback?: SubscribeFailureCallback,
}

export interface IRemoveSubscribePayload {
  readonly topic: SubscribeTopic,
}
export interface IRemoveSubscribeMeta {
  readonly successCallback?: PacketSuccessCallback,
  readonly failureCallback?: PacketFailureCallback,
}
//
// (method) MqttClient.publish(
//  topic: string,
//  message: string | Buffer,
//  opts: IClientPublishOptions,
//  callback?: PacketCallback): MqttClient (+1 overload)
// client.()
export interface IPublishPayload {
  readonly topic: PublisherTopic,
  readonly message: Message,
  readonly options?: IClientPublishOptions,
}
export interface IPublishMeta {
  readonly successCallback?: PacketSuccessCallback,
  readonly failureCallback?: PacketFailureCallback,
}

