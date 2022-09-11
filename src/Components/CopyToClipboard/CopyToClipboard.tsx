import { useEffect, useState } from 'react';

import * as styles from './CopyToClipboard.module.css';

interface CopyText {
  text: string;
}

export const CopyToClipboard = (props: CopyText) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(props.text);
  };
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);

  return (
    <button
      disabled={copied}
      className={styles.copy}
      onClick={() => handleCopy()}
    ></button>
  );
};
