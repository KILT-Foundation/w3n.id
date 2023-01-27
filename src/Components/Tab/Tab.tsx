import React from 'react';

import style from './Tab.module.css';

type typeOpenTab = 'kilt' | 'paypal';

type Props = {
  children: JSX.Element[];
};
export const Tabs = ({ children }: Props) => {
  const [openTab, setOpenTab] = React.useState<typeOpenTab>('kilt');

  const handleTabChange = (tab: typeOpenTab) => {
    setOpenTab(tab);
  };

  return (
    <>
      <div className={style.tabContainer}>
        <button
          onClick={() => handleTabChange('kilt')}
          style={openTab !== 'kilt' ? { backgroundColor: '#A4C992' } : {}}
          className={style.tabItem}
        >
          Pay with KILT
        </button>
        <button
          onClick={() => handleTabChange('paypal')}
          style={openTab !== 'paypal' ? { backgroundColor: '#A4C992' } : {}}
          className={style.tabItem}
        >
          Pay with PayPal
        </button>
      </div>
      {openTab === 'kilt' && children[0]}
      {openTab === 'paypal' && children[1]}
    </>
  );
};
