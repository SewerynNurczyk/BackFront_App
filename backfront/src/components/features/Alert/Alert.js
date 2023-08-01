import styles from './Alert.module.scss';

const Alert = (props) => {
  return(
    <div className={styles.alertContainer}>
      <div className={styles.alertDescription}>
        <div>{props.title}</div>
        <div className={styles.alertText}>{props.children}</div>
      </div>
    </div>
  )
}

export default Alert;
