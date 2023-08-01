import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import { useState } from 'react';
import { API_URL } from '../../../config';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ login, password })
        };

        setStatus('loading');
        fetch(`${API_URL}/api/auth/login`, options)
            .then(res => {
                if (res.status === 200) {
                    setStatus('success');
                    dispatch(logIn({ login }));
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else if (res.status === 400) {
                    setStatus('clientError');
                } else {
                    setStatus('serverError');
                }
            })
            .catch(err => {
                setStatus('serverError');
            });
    }

    return (
        <form onSubmit={handleSubmit}>

            {status === "success" && (
                <Alert variant='success'>
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have been successfully logged in</p>
                </Alert>
            )}

            {status === "clientError" && (
                <Alert variant='danger'>
                    <Alert.Heading>Incorrect data</Alert.Heading>
                    <p>Login or password are incorrect...</p>
                </Alert>
            )}

            {status === "serverError" && (
                <Alert variant='danger'>
                    <Alert.Heading>Something went wrong!</Alert.Heading>
                    <p>Unexpected error please try again</p>
                </Alert>
            )}

            {status === "loading" && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            <div>
                <label>Login:</label>
                <TextInput value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter login" type="text"></TextInput>
            </div>
            <div>
                <label>Password:</label>
                <TextInput value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" type="password"></TextInput>
            </div>
            <Button type="submit" value="Submit">Log in</Button>
        </form>
    )
}

export default LoginForm;