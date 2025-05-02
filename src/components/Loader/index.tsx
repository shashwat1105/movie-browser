import styles from './styles.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Loading movies...</p>
    </div>
  );
};

export default Loader;