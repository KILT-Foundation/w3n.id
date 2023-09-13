import { useEffect, useState } from 'react';

import { HTTPError } from 'ky';

import * as styles from './FormError.module.css';

export function FormError({ error }: { error?: string | Error }) {
  const [message, setMessage] = useState(String(error));

  useEffect(() => {
    (async () => {
      if (error instanceof HTTPError) {
        const json = (await error.response.json()) as { message: string };
        setMessage(json.message);
      }
      if (error instanceof Error) {
        setMessage(error.message);
      }
      if (error !== undefined) {
        setMessage(error.toString());
      }
    })();
  }, [error]);

  return (
    <output className={styles.container} hidden={error !== undefined}>
      {message}
    </output>
  );
}
