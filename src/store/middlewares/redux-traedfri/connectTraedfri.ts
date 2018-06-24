import { discoverGateway, TradfriClient, AccessoryTypes } from 'node-tradfri-client';
import { Store } from 'redux';

import {
  gatewayDiscovered,
  setCredentials,
  connected,
  updateLightBulb,
  removeLightBulb,
} from './actions';

const getCredentials = async (client: TradfriClient) => {
  if (process.env.IDENTITY && process.env.PSK) {
    return {
      identity: process.env.IDENTITY,
      psk: process.env.PSK,
    };
  }

  return client.authenticate(process.env.SECURITY_CODE);
};

const connectTraedfri = async ({ dispatch }: Store) => {
  try {
    const discovered = await discoverGateway();

    dispatch(gatewayDiscovered(discovered));

    const client = new TradfriClient(discovered.addresses[0]);
    const { identity, psk } = await getCredentials(client);

    dispatch(setCredentials({ identity, psk }));

    await client.connect(identity, psk);

    dispatch(connected());

    client
      .on('device updated', (device) => {
        if (device.type === AccessoryTypes.lightbulb) {
          dispatch(updateLightBulb(device));
        }
      })
      .on('device removed', (instanceId) => {
        dispatch(removeLightBulb(instanceId));
      })
      .observeDevices();

    return client;
  } catch (error) {
    throw error;
  }
};

export default connectTraedfri;
