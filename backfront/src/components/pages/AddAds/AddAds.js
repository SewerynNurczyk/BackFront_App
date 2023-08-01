import styles from './AddAds.module.scss';
import TextInput from '../../features/TextInput/TextInput';
import { useState } from 'react';
import Button from '../../features/Button/Button';
import { API_URL } from '../../../config';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const AddAds = (props) => {

    const [title, setTitle] = useState(props.title || '');
    const [description, setDescription] = useState(props.description || '');
    const [price, setPrice] = useState(props.price || '');
    const [pubDate, setPubDate] = useState(props.pubDate || '')
    const [location, setLocation] = useState(props.location || '');
    const [image, setImage] = useState(props.image || null);
    const [status, setStatus] = useState(null);

    const currentUser = localStorage.getItem('loggedInUser');
    console.log(currentUser);

    const handleSubmit = e => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('title', title);
        fd.append('description', description);
        fd.append('price', price);
        fd.append('location', location);
        fd.append('image', image);
        fd.append('user', currentUser);
        fd.append('pubDate', pubDate);

        const option = {
            method: 'POST',
            credentials: 'include',
            body: fd,
        };

        setStatus('loading');
        fetch(`${API_URL}/api/ads`, option)
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
                console.log(err);
                setStatus('serverError');
            });
    }



    return (

        <form className={styles.adsForm} onSubmit={handleSubmit}>

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
                <label>Title: </label>
                <TextInput value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" type="text"></TextInput>
            </div>

            <div className={styles.dform}>
                <label>Description: </label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows="5" cols="30"></textarea>
            </div>

            <div className={styles.dform}>
                <label>Price: </label>
                <TextInput value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter price" type="number"></TextInput>
            </div>

            <div className={styles.dform}>
                <label>Date: </label>
                <TextInput value={pubDate} onChange={e => setPubDate(e.target.value)} placeholder="Enter date" type="date"></TextInput>
            </div>

            <div className={styles.dform}>
                <label>Locaction: </label>
                <TextInput value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter location" type="text"></TextInput>
            </div>

            <div>
                <label>Image: </label>
                <TextInput type="file" onChange={e => setImage(e.target.files[0])}></TextInput>
            </div>
            <Button type="submit" value="Submit">Submit</Button>
        </form>

    )
};

export default AddAds;