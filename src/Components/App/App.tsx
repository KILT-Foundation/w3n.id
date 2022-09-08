import { Route, Routes } from 'react-router-dom';

import * as styles from './App.module.css';

import { Footer } from '../Footer/Footer';
import { Terms } from '../Terms/Terms';
import { Header } from '../Header/Header';

import { Search } from '../Search/Search';
import { paths } from '../../Utils/paths';
import { Privacy } from '../Privacy/Privacy';
import { Imprint } from '../Imprint/Imprint';

export const App = () => {
  return (
    <div className={styles.container}>
      <Header />

      <Routes>
        <Route path={paths.main} element={<Search />} />

        <Route path={paths.terms} element={<Terms />} />

        <Route path={paths.privacy} element={<Privacy />} />

        <Route path={paths.imprint} element={<Imprint />} />

        <Route path="*" element={<Search />} />
      </Routes>
      <Footer />
    </div>
  );
};
