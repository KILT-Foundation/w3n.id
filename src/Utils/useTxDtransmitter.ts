import useSWR from 'swr';
import ky from 'ky';

import { getEndpoint } from './claimWeb3name-helpers';

const TXDURLs: Record<string, string> = {
  'wss://kilt-rpc.dwellir.com': 'https://txd.trusted-entity.io',
  'wss://spiritnet.kilt.io': 'https://txd.trusted-entity.io',
  'wss://peregrine.kilt.io/parachain-public-ws':
    'https://txd-dev.trusted-entity.io',
  'wss://peregrine-stg.kilt.io/para': 'https://txd-dev.trusted-entity.io',
  'wss://sporran-testnet.kilt.io': 'https://txd-dev.trusted-entity.io',
};

const CHECKOUTURLs: Record<string, string> = {
  'wss://kilt-rpc.dwellir.com': 'https://checkout.kilt.io',
  'wss://spiritnet.kilt.io': 'https://checkout.kilt.io',
  'wss://peregrine.kilt.io/parachain-public-ws': 'https://checkout.kilt.io', // revert to dev, if the authorization is suppressed.
  'wss://peregrine-stg.kilt.io/para': 'https://stg-checkout.kilt.io',
  'wss://sporran-testnet.kilt.io': 'https://checkout.kilt.io', //revert to dev, if the authorization is suppressed.
};

function useApi<Output>(key: Parameters<typeof useSWR>[0]) {
  return useSWR<Output>(key, (input, options) => ky(input, options).json());
}

export function getCheckoutURL() {
  const endpoint = getEndpoint();
  return TXDURLs[endpoint];
}

export function useApiTXDAddress() {
  const TXD = getCheckoutURL();
  return useApi<{ paymentAddress: string }>(`${TXD}/meta`);
}

export function useApiTXDCosts() {
  const endpoint = getEndpoint();
  const CHECKOUT = CHECKOUTURLs[endpoint];
  return useApi<{ did: string; w3n: string }>(`${CHECKOUT}/api/costs`);
}
