import styles from './SearchInput.module.scss';

const SearchInput = props => {
  return (<input className={styles.input} placeholder={props.placeholder} value={props.value} onChange={props.onChange} type="text" />)
}

export default SearchInput;