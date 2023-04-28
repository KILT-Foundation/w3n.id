import type { HexString } from '@polkadot/util/types';

import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { connect, DidResourceUri } from '@kiltprotocol/sdk-js';

export type InjectedAccount = Awaited<
  ReturnType<typeof getWeb3Accounts>
>[number];

export const endpoint = process.env.REACT_APP_CHAIN_ENDPOINT as string;
if (!endpoint) {
  throw new Error('No Chain endpoint provided.');
}

async function getWeb3Accounts() {
  await web3Enable('web3name Claiming');
  return web3Accounts();
}

export const apiPromise = connect(endpoint);

export async function getAccounts() {
  const allAccounts = await getWeb3Accounts();
  const api = await apiPromise;

  const genesisHash = api.genesisHash.toHex();
  return allAccounts.filter(
    ({ meta }) => !meta.genesisHash || meta.genesisHash === genesisHash,
  );
}

export type SignExtrinsicWithDid = (
  extrinsic: HexString,
  signer: string,
) => Promise<{ signed: HexString; didKeyUri: string }>;

export function getSignButtonsData(
  handleSign: (sign: SignExtrinsicWithDid) => void,
  handleNoWallet: () => void,
): Array<{ key: string; name: string; handleClick: () => void }> {
  const capableWallets = [...Object.entries(window.kilt)]
    .filter(([key]) => window.kilt[key].signExtrinsicWithDid)
    .map(([key, { name = key, signExtrinsicWithDid }]) => ({
      key,
      name,
      handleClick: () => handleSign(signExtrinsicWithDid),
    }));
  const fakeWallet = { key: 'fake', name: 'Fake', handleClick: handleNoWallet };
  return capableWallets.length > 0 ? capableWallets : [fakeWallet];
}

export async function getW3NameExtrinsic(
  web3name: string,
  payerAddress: string,
  signExtrinsicWithDid: SignExtrinsicWithDid,
) {
  const api = await apiPromise;
  const extrinsic = api.tx.web3Names.claim(web3name);

  const { signed, didKeyUri } = await signExtrinsicWithDid(
    extrinsic.toHex(),
    payerAddress,
  );

  return { extrinsic: api.tx(signed), didKeyUri: didKeyUri as DidResourceUri };
}
