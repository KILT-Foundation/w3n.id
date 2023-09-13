import { type SignExtrinsicWithDid } from './claimWeb3name-helpers';

export {};
declare global {
  interface Window {
    kilt: Record<
      string,
      {
        name?: string;
        signExtrinsicWithDid: SignExtrinsicWithDid;
      }
    >;
  }
}
