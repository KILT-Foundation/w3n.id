import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

import { Did } from '@kiltprotocol/sdk-js';

import { ApiPromise, WsProvider } from '@polkadot/api';

export type InjectedAccount = Awaited<
  ReturnType<typeof getWeb3Accounts>
>[number];

async function getWeb3Accounts() {
  await web3Enable('web3name Claiming');
  return web3Accounts();
}

export const connect = async () => {
  const ENDPOINT_URL = process.env.REACT_APP_CHAIN_ENDPOINT;
  const provider = new WsProvider(ENDPOINT_URL);
  return await ApiPromise.create({
    provider,
  });
};

export async function getAccounts() {
  const allAccounts = await getWeb3Accounts();
  const api = await connect();

  const genesisHash = api.genesisHash.toHex();
  const filteredAccounts = allAccounts.filter(
    ({ meta }) => !meta.genesisHash || meta.genesisHash === genesisHash,
  );
  api.disconnect();

  return filteredAccounts;
}

export async function getW3NameExtrinsic(
  web3name: string,
  payerAddress: string,
) {
  const extrinsic = await Did.Web3Names.getClaimTx(web3name);
  const api = await connect();

  const signedOutputFromExtension =
    await window.kilt.sporran.signExtrinsicWithDid(
      extrinsic.toHex(),
      payerAddress,
    );

  const genericExtrinsic = api.createType(
    'Extrinsic',
    signedOutputFromExtension.signed,
  );

  return api.tx.did.submitDidCall(
    genericExtrinsic.args[0],
    genericExtrinsic.args[1],
  );
}
