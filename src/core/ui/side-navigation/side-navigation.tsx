import styles from './side-navigation';

/* eslint-disable-next-line */
export interface TestProps {}

export function SideNavigation() {
  return (
    <div className={styles['container']}>
      <h1>SideNavigation</h1>
    </div>
  );
}

export default SideNavigation;