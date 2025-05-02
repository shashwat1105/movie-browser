import { AlertTriangle } from 'lucide-react';
import styles from './styles.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <AlertTriangle size={48} className={styles.icon} />
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/" className={styles.homeLink}>Go back home</a>
    </div>
  );
};

export default NotFound;