import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [link, setLink] = useState('');

  const handleChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validURL = validator.isURL(url, {
      required_protocol: true,
    });
    if (!validURL) {
      setLink(
        'Please Ensure this url is correct and includes the http(s) protocol.'
      );
    } else {
      axios
        .post('http://localhost:8080/api/shorten', {
          url: url,
        })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.hash);
          setLink(`http://rds.com/${res.data.hash}`);
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <input
            type='text'
            placeholder='Enter URL including http(s) protocols'
            onChange={handleChange}
          />
          <button type='submit'>Shorten</button>
        </fieldset>
        <fieldset>{link ?? <span id='result'>{link}</span>}</fieldset>
      </form>
    </div>
  );
};

export default UrlForm;
