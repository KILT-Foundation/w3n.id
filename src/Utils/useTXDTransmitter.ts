import useSWR, { type Key } from 'swr';
import ky from 'ky';

import { type KiltAddress } from '@kiltprotocol/sdk-js';

import { endpoint } from './claimWeb3name-helpers';

function deductTxdURL(blockchainEndpoint: string) {
  const endpoint = blockchainEndpoint.toLowerCase();
  if (endpoint.includes('peregrine-stg')) {
    return 'https://smoke.txd.trusted-entity.io';
  }
  if (endpoint.includes('peregrine')) {
    return 'https://dev.txd.trusted-entity.io';
  }
  return 'https://txd.trusted-entity.io';
}

function deductCheckoutServiceURL(blockchainEndpoint: string) {
  const endpoint = blockchainEndpoint.toLowerCase();
  if (endpoint.includes('peregrine-stg')) {
    return 'https://smoke.checkout.kilt.io';
  }
  if (endpoint.includes('peregrine')) {
    return 'https://dev.checkout.kilt.io';
  }
  return 'https://checkout.kilt.io';
}

function useApi<Output>(key: Key) {
  return useSWR<Output, string | Error>(
    key,
    async (...args: Parameters<typeof ky>) => await ky(...args).json(),
  );
}

export const checkoutServiceURL = deductCheckoutServiceURL(endpoint);
const txdUrl = deductTxdURL(endpoint);

export function useApiTXDCosts() {
  return useApi<{ did: string; w3n: string }>(
    `${checkoutServiceURL}/api/costs`,
  );
}

export function useApiTXDAddress() {
  return useApi<{ paymentAddress: KiltAddress }>(`${txdUrl}/meta`);
}
