import { useState, Fragment, useCallback } from 'react';

import style from './Tab.module.css';

type TypeOpenTab = 'kilt' | 'paypal';

type Props = {
  children: JSX.Element[];
};
export function Tabs({ children }: Props) {
  const [openTab, setOpenTab] = useState<TypeOpenTab>('kilt');

  const setKiltTab = useCallback(() => {
    setOpenTab('kilt');
  }, []);

  const setPayPalTab = useCallback(() => {
    setOpenTab('paypal');
  }, []);

  return (
    <Fragment>
      <div className={style.tabContainer}>
        <button
          onClick={setKiltTab}
          className={openTab === 'kilt' ? style.tabItem : style.activeTabItem}
        >
          Pay with KILT
        </button>
        <button
          onClick={setPayPalTab}
          className={openTab === 'paypal' ? style.tabItem : style.activeTabItem}
        >
          Pay with PayPal
        </button>
      </div>
      {openTab === 'kilt' && children[0]}
      {openTab === 'paypal' && children[1]}
    </Fragment>
  );
}
