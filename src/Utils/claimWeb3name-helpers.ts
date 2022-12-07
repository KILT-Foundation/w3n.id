import type {
  DidDidDetailsDidAuthorizedCallOperation,
  DidDidDetailsDidSignature,
} from '@kiltprotocol/augment-api';

import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { connect } from '@kiltprotocol/sdk-js';

export type InjectedAccount = Awaited<
  ReturnType<typeof getWeb3Accounts>
>[number];

async function getWeb3Accounts() {
  await web3Enable('web3name Claiming');
  return web3Accounts();
}

export const apiPromise = connect(
  process.env.REACT_APP_CHAIN_ENDPOINT as string,
);

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
    genericExtrinsic.args[0] as DidDidDetailsDidAuthorizedCallOperation,
    genericExtrinsic.args[1] as DidDidDetailsDidSignature,
  );
}
