import LoginForm from '../../features/LoginForm/LoginForm';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.login}>
      <LoginForm/>
    </div>
  )
};

export default Login;