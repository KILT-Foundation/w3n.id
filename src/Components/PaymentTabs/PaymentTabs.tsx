import { useState, Fragment, useCallback } from 'react';

import style from './PaymentTabs.module.css';

type TypeOpenTab = 'kilt' | 'paypal';

interface Props {
  children: [JSX.Element, JSX.Element];
}

export function PaymentTabs({ children }: Props) {
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
          Use Checkout Service / PayPal
        </button>
      </div>
      {openTab === 'kilt' && children[0]}
      {openTab === 'paypal' && children[1]}
    </Fragment>
  );
}
