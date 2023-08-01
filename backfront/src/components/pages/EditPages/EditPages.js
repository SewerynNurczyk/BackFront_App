import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../../config';
import { getAdById, editAd, fetchAds } from '../../../redux/adsRedux';
import AdEdit from '../../features/AdEdit/AdEdit';
import { Alert } from 'react-bootstrap';

const EditPages = () => {
  const [ status, setStatus] = useState(null)
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  const adData = useSelector((state) => getAdById(state, id));
  console.log(adData)

  const handleSubmit = (ad) => {
    const fd = new FormData();
    fd.append('title', ad.title);
    fd.append('description', ad.description);
    fd.append('date', ad.pubDate);
    fd.append('price', ad.price);
    fd.append('location', ad.location);
    fd.append('image', ad.image);
    fd.append('user', ad.user);

    const options = {
      method: 'PUT',
      body: fd,
      credentials: 'include',
    };

    fetch(`${API_URL}/api/ads/${id}`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus('succes')
          dispatch(editAd({ ...adData, id }));
          setTimeout(() => navigate('/'), 1000);
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch((err) => {
        setStatus('serverError');
      });
  };

  return (
    <>
      {status === 'success' && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>Your announcement has been successfully added!</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant="danger">
          <Alert.Heading>Not enough data or data are incorrect</Alert.Heading>
          <p>You have to fill all the fields. Photo has to be one of this type of file: *.jpg, *.jpeg, *.gif, *.png.</p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}

      <AdEdit
        action={handleSubmit}
        actionText="Edit ad"
        title={adData.title}
        description={adData.description}
        pubDate={adData.pubDate}
        price={adData.price}
        location={adData.location}
        image={adData.image}
      />
    </>
  );
};

export default EditPages;