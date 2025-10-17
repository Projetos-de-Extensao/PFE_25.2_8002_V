import styles from './Overlay.module.scss';

export default function Overlay({ isVisible, onClick }) {
  return (
    <>
      {isVisible && <div className={styles.overlay} onClick={onClick}></div>}
    </>
  );
}