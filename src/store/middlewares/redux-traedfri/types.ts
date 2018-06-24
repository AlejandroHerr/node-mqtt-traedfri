/* eslint-disable import/prefer-default-export */
import { DeviceRemovedCallback, DeviceUpdatedCallback } from 'node-tradfri-client';

export type Credentials = {
  identity: string,
  psk: string,
};

export type AddRemovedHandlerPayload = {
  eventType: 'device removed',
  handler: DeviceRemovedCallback,
};

export type AddUpdatedHandlerPayload = {
  eventType: 'device updated',
  handler: DeviceUpdatedCallback,
};

export type AddHandlerPayload = AddRemovedHandlerPayload | AddUpdatedHandlerPayload;
