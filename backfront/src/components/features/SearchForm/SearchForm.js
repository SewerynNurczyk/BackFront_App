import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchAd } from '../../../redux/adsRedux';
import { Form, Button } from 'react-bootstrap';

const SearchForm = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchAd(searchPhrase));
  };

  return (
    <div className="d-flex">
      <Form.Group controlId="searchForm">
        <Form.Control type="text" value={searchPhrase} onChange={(e) => setSearchPhrase(e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={handleSearch} className="mx-2">Search</Button>
    </div>

  );
};

export default SearchForm;