import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import styles from './App.module.css';

import { Footer } from '../Footer/Footer';
import { Terms } from '../Terms/Terms';
import { Header } from '../Header/Header';

import { Search } from '../Search/Search';
import { paths } from '../../Utils/paths';
import { Privacy } from '../Privacy/Privacy';

export const App = () => {
  const [tourSection, setTourSection] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Header
        handleTourSection={() => setTourSection(!tourSection)}
        tourSection={tourSection}
      />

      <Routes>
        <Route path={paths.main} element={<Search />} />

        <Route path={paths.terms} element={<Terms />} />

        <Route path={paths.privacy} element={<Privacy />} />

        <Route path="*" element={<Search />} />
      </Routes>
      <Footer />
    </div>
  );
};
