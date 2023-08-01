import React from 'react';
import SearchForm from '../../features/SearchForm/SearchForm';
import { getUser } from '../../../redux/usersRedux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CollectionAds from '../../features/CollectionAds/CollectionAds';

const Home = () => {

  const loggedInUser = useSelector(getUser);

  return (
    <>
      <SearchForm />
      <CollectionAds />

      {loggedInUser && <Link to="/ads/add">Add advertising</Link>}
    </>
  );
};

export default Home;