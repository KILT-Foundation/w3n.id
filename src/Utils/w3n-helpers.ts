import {
  Did,
  ICredential,
  Credential,
  DidServiceEndpoint,
  DidUri,
} from '@kiltprotocol/sdk-js';

const resolveSeviceEndpoints = async (did: DidUri) => {
  const didDetails = await Did.DidResolver.resolveDoc(did);
  const endPoints = didDetails?.details?.getEndpoints();
  if (endPoints) {
    return endPoints;
  } else {
    return [];
  }
};
export const getServiceEndpointsW3Name = async (
  did: DidUri,
): Promise<{
  endpoints: DidServiceEndpoint[];
  web3name: string | null;
}> => {
  const serviceEndpoint = await resolveSeviceEndpoints(did);
  const w3name = await Did.Web3Names.queryWeb3NameForDid(did);
  return { endpoints: serviceEndpoint, web3name: w3name };
};
export const isSearchedTextDid = (searchedText: string): boolean => {
  const didKeyword = searchedText.split(':').slice(0, -2);
  return didKeyword.includes('did') && didKeyword.length === 1;
};
export const getDidDocFromW3Name = async (
  w3name: string,
): Promise<{
  endpoints: DidServiceEndpoint[];
  did: DidUri;
} | null> => {
  const did = await Did.Web3Names.queryDidForWeb3Name(w3name);
  if (did) {
    const serviceEndpoint = await resolveSeviceEndpoints(did);
    return { endpoints: serviceEndpoint, did: did };
  }
  return null;
};
export const hasUpperCase = (text: string) => text.toLocaleLowerCase() !== text;

export const validSearchedText = (text: string) => /^[a-z0-9_-]*$/.test(text);

export const validateCredential = async (
  credentialInput: ICredential,
): Promise<boolean> => {
  const credential = Credential.fromCredential(credentialInput);
  return await Credential.verify(credential);
};
export const stringStartsWithW3 = (text: string) =>
  /^w3n:[a-z0-9_-]*$/.test(text);

export const pushHistoryState = (
  shouldChangeUrl: boolean,
  textFromSearch: string,
) => {
  const url = window.location.origin + '/' + textFromSearch;
  if (shouldChangeUrl) window.history.pushState({ path: url }, '', url);
};
export const replaceHistoryState = (shouldChangeUrl: boolean, name: string) => {
  const url = window.location.origin + '/' + name;
  if (shouldChangeUrl) window.history.replaceState({ path: url }, '', url);
};

export const getLinkedAccounts = async (did: DidUri) =>
  await Did.AccountLinks.queryConnectedAccountsForDid(
    Did.Utils.getIdentifierFromKiltDid(did),
  );
