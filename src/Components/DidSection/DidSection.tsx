import * as styles from './DidSection.module.css';

import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';
import { useHandleOutsideClick } from '../../Hooks/useHandleOutsideClick';

interface Props {
  did?: DidUri;
}

export const DidSection = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useHandleOutsideClick(modalRef, () => setShowModal(!showModal));

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <span className={styles.title}>DID</span>
        <button className={styles.infoBtn} onClick={() => setShowModal(true)}>
          {showModal && (
            <div className={styles.modal}>
              <p className={`${styles.modalText} ${styles.top}`} ref={modalRef}>
                A DID (decentralized identifier) is a unique string of numbers
                and letters that functions like a digital fingerprint. It forms
                the core of a digital identity.
              </p>
            </div>
          )}
        </button>
      </div>
      <div className={styles.wrapper}>
        <span className={styles.text}>{props.did}</span>
        {props.did && <CopyToClipboard text={props.did} />}
      </div>
    </div>
  );
};
