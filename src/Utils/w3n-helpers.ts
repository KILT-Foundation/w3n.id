export const isSearchedTextDid = (searchedText: string): boolean => {
  const didKeyword = searchedText.split(':').slice(0, -2);
  return didKeyword.includes('did') && didKeyword.length === 1;
};

export const validSearchedText = (text: string) => /^[a-z0-9_-]*$/.test(text);

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
