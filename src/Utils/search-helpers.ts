import {
  Attestation,
  Did,
  ICredential,
  init,
  IRequestForAttestation,
  Credential,
} from '@kiltprotocol/sdk-js'

export const getServiceEndpoints = async (
  did: string
): Promise<{
  ids: string[]
  urls: string[]
  types: string[]
  web3name: string | null
} | null> => {
  const urls: string[] = []
  const types: string[] = []
  const ids: string[] = []

  await init({ address: 'wss://sporran-testnet.kilt.io' })
  const didDetails = await Did.DidResolver.resolveDoc(did)
  const endPoints = didDetails?.details?.getEndpoints()
  if (endPoints != null) {
    for (const endPoint of endPoints) {
      urls.push(...endPoint.urls)
      types.push(...endPoint.types)
      ids.push(endPoint.id)
    }
    const w3name = await Did.Web3Names.queryWeb3NameForDid(did)
    return { ids: ids, urls: urls, types: types, web3name: w3name }
  }
  return null
}
export const isSearchedTextDid = (searchedText: string): boolean => {
  const didKeyword = searchedText.split(':').slice(0, -2)
  if (didKeyword.includes('did') && didKeyword.length === 1) {
    return true
  }
  return false
}
export const isSearchedTextKiltDid = (searchedText: string): boolean => {
  const kiltKeyword = searchedText.split(':').slice(1, -1)
  if (kiltKeyword.includes('kilt') && kiltKeyword.length === 1) {
    return true
  }
  console.log(kiltKeyword)
  return false
}
export const getDidDocFromW3Name = async (
  w3name: string
): Promise<{
  ids: string[]
  urls: string[]
  types: string[]
  did: string
} | null> => {
  const urls: string[] = []
  const types: string[] = []
  const ids: string[] = []

  await init({ address: 'wss://sporran-testnet.kilt.io' })
  const did = await Did.Web3Names.queryDidForWeb3Name(w3name)
  if (did != null) {
    const didDetails = await Did.DidResolver.resolveDoc(did)
    const endPoints = didDetails?.details?.getEndpoints()
    if (endPoints != null) {
      for (const endPoint of endPoints) {
        urls.push(...endPoint.urls)
        types.push(...endPoint.types)
        ids.push(endPoint.id)
      }
      return { ids: ids, urls: urls, types: types, did: did }
    }
  }
  return null
}
export const isUpperCase = (text: string) => text.toLocaleLowerCase() !== text

export const invalidSearchedText = (text: string) => /[^a-z]/.test(text)

export const getDidForAccount = (did: string): string => {
  return Did.DidUtils.getKiltDidFromIdentifier(did, 'full')
}

export const getAttestationForRequest = async (
  req4Att: IRequestForAttestation
) => {
  return Attestation.query(req4Att.rootHash)
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
