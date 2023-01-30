import { useEffect, useState } from 'react';

import { HTTPError } from 'ky';

import * as styles from './FormError.module.css';

export function FormError({ error }: { error?: string | Error }) {
  const [message, setMessage] = useState(String(error));

  useEffect(() => {
    (async () => {
      if (error instanceof HTTPError) {
        setMessage((await error.response.json()).message);
      }
      if (error instanceof Error) {
        setMessage(error.message);
      }
      if (error) {
        setMessage(error?.toString());
      }
    })();
  }, [error]);

  return (
    <output className={styles.container} hidden={!error}>
      {message}
    </output>
  );
}
