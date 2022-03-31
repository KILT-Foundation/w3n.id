import {
  Attestation,
  Did,
  ICredential,
  IRequestForAttestation,
  Credential,
  DidServiceEndpoint,
} from '@kiltprotocol/sdk-js'

const resolveSeviceEndpoints = async (did: string) => {
  const didDetails = await Did.DidResolver.resolveDoc(did)
  const endPoints = didDetails?.details?.getEndpoints()
  if (endPoints) {
    return endPoints
  } else {
    return []
  }
}
export const getServiceEndpointsW3Name = async (
  did: string
): Promise<{
  endpoints: DidServiceEndpoint[]
  web3name: string | null
}> => {
  const serviceEndpoint = await resolveSeviceEndpoints(did)
  const w3name = await Did.Web3Names.queryWeb3NameForDid(did)
  return { endpoints: serviceEndpoint, web3name: w3name }
}
export const isSearchedTextDid = (searchedText: string): boolean => {
  const didKeyword = searchedText.split(':').slice(0, -2)
  return didKeyword.includes('did') && didKeyword.length === 1
}
export const isSearchedTextKiltDid = (searchedText: string): boolean => {
  const kiltKeyword = searchedText.split(':').slice(1, -1)
  return kiltKeyword.includes('kilt') && kiltKeyword.length === 1
}
export const getDidDocFromW3Name = async (
  w3name: string
): Promise<{
  endpoints: DidServiceEndpoint[]
  did: string
} | null> => {
  const did = await Did.Web3Names.queryDidForWeb3Name(w3name)
  if (did) {
    const serviceEndpoint = await resolveSeviceEndpoints(did)
    return { endpoints: serviceEndpoint, did: did }
  }
  return null
}
export const hasUpperCase = (text: string) => text.toLocaleLowerCase() !== text

export const validSearchedText = (text: string) => /^[a-z0-9_-]*$/.test(text)

export const getDidForAccount = (did: string): string => {
  return Did.DidUtils.getKiltDidFromIdentifier(did, 'full')
}

export const getAttestationForRequest = async (
  reqforAttestation: IRequestForAttestation
) => {
  return Attestation.query(reqforAttestation.rootHash)
}

export const validateAttestation = async (attestation: Attestation | null) => {
  if (attestation != null) {
    if (!attestation.revoked) {
      return true
    }
  }
  return false
}
export const validateCredential = async (
  credentialInput: ICredential
): Promise<boolean> => {
  const credential = Credential.fromCredential(credentialInput)
  return await Credential.verify(credential)
}
export const stringStartsWithW3 = (text: string) =>
  /^w3n:[a-z0-9_-]*$/.test(text)

export const pushHistoryState = (
  shouldChangeUrl: boolean,
  textFromSearch: string
) => {
  const url = window.location.origin + '/' + textFromSearch
  if (shouldChangeUrl) window.history.pushState({ path: url }, '', url)
}
export const replaceHistoryState = (shouldChangeUrl: boolean, name: string) => {
  const url = window.location.origin + '/' + name
  if (shouldChangeUrl) window.history.replaceState({ path: url }, '', url)
}
