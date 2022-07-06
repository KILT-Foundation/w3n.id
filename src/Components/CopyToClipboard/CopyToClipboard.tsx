import { useEffect, useState } from 'react';

import styles from './CopyToClipboard.module.css';

import { ReactComponent as Copied } from '../../ImageAssets/copied.svg';
import { ReactComponent as Copy } from '../../ImageAssets/copy2clipboard_light.svg';

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
    <div className={styles.container}>
      {copied ? (
        <Copied className={styles.copied} />
      ) : (
        <Copy className={styles.copy} onClick={() => handleCopy()} />
      )}
    </div>
  );
};
