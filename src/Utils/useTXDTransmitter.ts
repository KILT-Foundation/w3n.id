import useSWR, { type Key } from 'swr';
import ky from 'ky';

import { type KiltAddress } from '@kiltprotocol/sdk-js';

import { endpoint } from './claimWeb3name-helpers';

const txdUrls: Record<string, string> = {
  'wss://kilt-rpc.dwellir.com': 'https://txd.trusted-entity.io',
  'wss://spiritnet.kilt.io': 'https://txd.trusted-entity.io',
  'wss://spiritnet.api.onfinality.io/public-ws':
    'https://txd.trusted-entity.io',
  'wss://peregrine.kilt.io': 'https://dev.txd.trusted-entity.io',
  'wss://peregrine-stg.kilt.io/para': 'https://smoke.txd.trusted-entity.io',
};

const checkoutUrls: Record<string, string> = {
  'wss://kilt-rpc.dwellir.com': 'https://checkout.kilt.io',
  'wss://spiritnet.kilt.io': 'https://checkout.kilt.io',
  'wss://spiritnet.api.onfinality.io/public-ws': 'https://checkout.kilt.io',
  'wss://peregrine.kilt.io': 'https://dev.checkout.kilt.io',
  'wss://peregrine-stg.kilt.io/para': 'https://smoke.checkout.kilt.io',
};

function useApi<Output>(key: Key) {
  return useSWR<Output, string | Error>(
    key,
    async (...args: Parameters<typeof ky>) => await ky(...args).json(),
  );
}

export const checkoutServiceURL = checkoutUrls[endpoint];

export function useApiTXDAddress() {
  const txdUrl = txdUrls[endpoint];
  const txdResponseForAddress = useApi<{ paymentAddress: KiltAddress }>(
    `${txdUrl}/meta`,
  );
  console.log('txdResponseForAddress: ', txdResponseForAddress);
  return txdResponseForAddress;
}

export function useApiTXDCosts() {
  const txdResponseForCosts = useApi<{ did: string; w3n: string }>(
    `${checkoutServiceURL}/api/costs`,
  );
  console.log('txdResponseForCosts: ', txdResponseForCosts);
  return txdResponseForCosts;
}
