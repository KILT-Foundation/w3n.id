import { useEffect, useState } from 'react';

/*eslint import/no-unresolved: [2, { ignore: ['^jsx'] }]*/
import Copied from 'jsx:../../ImageAssets/copied.svg';
import Copy from 'jsx:../../ImageAssets/copy2clipboard_light.svg';

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
    <div className={styles.container}>
      {copied ? (
        <Copied className={styles.copied} />
      ) : (
        <Copy className={styles.copy} onClick={() => handleCopy()} />
      )}
    </div>
  );
};
