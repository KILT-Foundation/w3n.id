import { ReactNode, useCallback, useRef, useState } from 'react';

import * as styles from './InfoIcon.module.css';

import { useHandleOutsideClick } from '../../Hooks/useHandleOutsideClick';

export function InfoIcon({
  children,
  right = false,
}: {
  children: ReactNode;
  right?: boolean;
}): JSX.Element {
  const [visible, setVisible] = useState(false);
  const show = useCallback(() => setTimeout(() => setVisible(true), 10), []);
  const hide = useCallback(() => setVisible(false), []);

  const ref = useRef(null);
  useHandleOutsideClick(ref, hide);

  return (
    <button className={styles.button} onClick={show}>
      {visible && (
        <span className={right ? styles.right : styles.wrapper}>
          <span className={styles.text} ref={ref}>
            {children}
          </span>
        </span>
      )}
    </button>
  );
}
