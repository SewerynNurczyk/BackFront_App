import TextInput from '../TextInput/TextInput';
import styles from './RegisterForm.module.scss';
import Button from '../Button/Button';
import { useState } from 'react';
import { API_URL } from '../../../config';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const RegisterForm = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [telephon, setTelephon] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(login, password, telephon, avatar);

    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('avatar', avatar);
    fd.append('telephon', telephon);

    const option = {
      method: 'POST',
      credentials: 'include',
      body: fd,
    };

    setStatus('loading');
    fetch(`${API_URL}/api/auth/register`, option)
      .then(res => {
        if (res.status === 201) {
          setStatus('success');
        } else if (res.status === 400) {
          setStatus('clientError');
        } else if (res.status === 409) {
          setStatus('loginError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => {
        setStatus('serverError');
      });
  }

  return (
    <form className={styles.register} onSubmit={handleSubmit}>

      <h1>Sign up</h1>

      {status === "success" && (
        <Alert variant='success'>
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successful registered</p>
        </Alert>
      )}

      {status === "serverError" && (
        <Alert variant='danger'>
          <Alert.Heading>Something went wrong!</Alert.Heading>
          <p>Unexpected error please try again</p>
        </Alert>
      )}

      {status === "clientError" && (
        <Alert variant='danger'>
          <Alert.Heading>Not enough data</Alert.Heading>
          <p>You have to fill all the fields</p>
        </Alert>
      )}

      {status === "loginError" && (
        <Alert variant='warning'>
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to use other login</p>
        </Alert>
      )}

      {status === "loading" && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <div className={styles.dform}>
        <label>Login: </label>
        <TextInput value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter login" type="text"></TextInput>
      </div>
      <div className={styles.dform}>
        <label>Password: </label>
        <TextInput value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" type="password"></TextInput>
      </div>
      <div>
        <label>Avatar: </label>
        <TextInput type="file" onChange={e => setAvatar(e.target.files[0])}></TextInput>
      </div>
      <div>
        <label>Telephon: </label>
        <TextInput value={telephon} onChange={e => setTelephon(e.target.value)} placeholder="Enter phone number" type="tel"></TextInput>
      </div>
      <Button type="submit" value="Submit">Submit</Button>
    </form>
  )
};

export default RegisterForm;