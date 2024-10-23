import useSWR, { type Key } from 'swr';
import ky from 'ky';

import { type KiltAddress } from '@kiltprotocol/sdk-js';

export const checkoutServiceURL = process.env.REACT_APP_CHECKOUT_URL as string;
if (!checkoutServiceURL) {
  throw new Error('No URL for the Checkout Service provided.');
}

const txdUrl = process.env.REACT_APP_TXD_URL as string;
if (!txdUrl) {
  throw new Error('No URL for the Transaction Daemon provided.');
}

function useApi<Output>(key: Key) {
  return useSWR<Output, string | Error>(
    key,
    async (...args: Parameters<typeof ky>) => await ky(...args).json(),
  );
}

export function useApiTXDCosts() {
  return useApi<{ did: string; w3n: string }>(
    `${checkoutServiceURL}/api/costs`,
  );
}

export function useApiTXDAddress() {
  return useApi<{ paymentAddress: KiltAddress }>(`${txdUrl}/meta`);
}
