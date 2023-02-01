import useSWR from 'swr';
import ky from 'ky';

import { KiltAddress } from '@kiltprotocol/sdk-js';

import { endpoint } from './claimWeb3name-helpers';

const txdUrls: Record<string, string> = {
  'wss://kilt-rpc.dwellir.com': 'https://txd.trusted-entity.io',
  'wss://spiritnet.kilt.io': 'https://txd.trusted-entity.io',
  'wss://peregrine.kilt.io/parachain-public-ws':
    'https://txd-dev.trusted-entity.io',
  'wss://peregrine-stg.kilt.io/para': 'https://txd-dev.trusted-entity.io',
  'wss://sporran-testnet.kilt.io': 'https://txd-dev.trusted-entity.io',
};

const checkoutUrls: Record<string, string> = {
  'wss://kilt-rpc.dwellir.com': 'https://checkout.kilt.io',
  'wss://spiritnet.kilt.io': 'https://checkout.kilt.io',
  'wss://peregrine.kilt.io/parachain-public-ws': 'https://dev-checkout.kilt.io',
  'wss://peregrine-stg.kilt.io/para': 'https://stg-checkout.kilt.io',
  'wss://sporran-testnet.kilt.io': 'https://dev-checkout.kilt.io',
};

function useApi<Output>(key: Parameters<typeof useSWR>[0]) {
  return useSWR<Output>(key, (input, options) => ky(input, options).json());
}

export function getCheckoutURLService() {
  return txdUrls[endpoint];
}

export function useApiTXDAddress() {
  const txdUrl = getCheckoutURLService();
  return useApi<{ paymentAddress: KiltAddress }>(`${txdUrl}/meta`);
}

export function useApiTXDCosts() {
  const checkoutURL = checkoutUrls[endpoint];
  return useApi<{ did: string; w3n: string }>(`${checkoutURL}/api/costs`);
}
