import { Did, init } from '@kiltprotocol/sdk-js'

export const getServiceEndpoints = async (
  did: string
): Promise<{ ids: string[]; urls: string[]; types: string[] } | null> => {
  const urls: string[] = []
  const types: string[] = []
  const ids: string[] = []

  await init({ address: 'wss://spiritnet.kilt.io' })
  const didDetails = await Did.DidResolver.resolveDoc(did)
  const endPoints = didDetails?.details?.getEndpoints()
  if (endPoints != null) {
    for (const endPoint of endPoints) {
      urls.push(...endPoint.urls)
      types.push(...endPoint.types)
      ids.push(endPoint.id)
    }
    return { ids: ids, urls: urls, types: types }
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
