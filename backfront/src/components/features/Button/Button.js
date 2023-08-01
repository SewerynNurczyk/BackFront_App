import styles from './Button.module.scss';

const Button = props => {
  return( <button className={styles.button} type={props.type} value={props.value}>{props.children}</button>)
};

export default Button;