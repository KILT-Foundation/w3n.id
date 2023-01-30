import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { connect } from '@kiltprotocol/sdk-js';

export type InjectedAccount = Awaited<
  ReturnType<typeof getWeb3Accounts>
>[number];

async function getWeb3Accounts() {
  await web3Enable('web3name Claiming');
  return web3Accounts();
}

export function getEndpoint() {
  const endpoint = process.env.REACT_APP_CHAIN_ENDPOINT as string;
  if (!endpoint) {
    throw new Error('No Chain endpoint provided.');
  }
  return endpoint;
}

export const apiPromise = connect(getEndpoint());

export async function getAccounts() {
  const allAccounts = await getWeb3Accounts();
  const api = await apiPromise;

  const genesisHash = api.genesisHash.toHex();
  return allAccounts.filter(
    ({ meta }) => !meta.genesisHash || meta.genesisHash === genesisHash,
  );
}

export async function getW3NameExtrinsic(
  web3name: string,
  payerAddress: string,
) {
  const api = await apiPromise;
  const extrinsic = api.tx.web3Names.claim(web3name);

  const { signed, didKeyUri } = await window.kilt.sporran.signExtrinsicWithDid(
    extrinsic.toHex(),
    payerAddress,
  );

  return { extrinsic: api.tx(signed), didKeyUri };
}
