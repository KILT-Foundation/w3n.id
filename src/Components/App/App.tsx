import { useState } from 'react';

import styles from './App.module.css';

import { Footer } from '../Footer/Footer';
import { Search } from '../Search/Search';
import { Header } from '../Header/Header';

import { ImprintPopup } from '../ImprintPopup/ImprintPopup';

export const App = () => {
  const [showImprint, setShowImprint] = useState<boolean>(false);
  const [tourSection, setTourSection] = useState<boolean>(false);

  const handleImprint = () => {
    if (showImprint) setShowImprint(false);
    else setShowImprint(true);
  };

  return (
    <body className={styles.container}>
      <Header
        handleTourSection={() => setTourSection(!tourSection)}
        tourSection={tourSection}
      />

      <Search />

      <Footer
        handleImprint={handleImprint}
        handleTourSection={() => setTourSection(true)}
      />

      {showImprint && <div className={styles.darkOverlay} />}
      {showImprint && <ImprintPopup handleCloseImprint={handleImprint} />}
    </body>
  );
};
