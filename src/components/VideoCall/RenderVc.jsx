import React, { useEffect, useState } from 'react';
import '@opentok/client';
import './index.css';
import './polyfills';

import {
  SAMPLE_SERVER_BASE_URL,
  API_KEY,
  SESSION_ID,
  TOKEN
} from './config';
import VideoCall from './VideoCall';

export default function RenderVc() {
  const [credentials, setCredentials] = useState({
    apiKey: API_KEY,
    sessionId: SESSION_ID,
    token: TOKEN,
  })
  // useEffect(() => {

  //   if (API_KEY && TOKEN && SESSION_ID) {
  //   setCredentials({
  //     apiKey: API_KEY,
  //     sessionId: SESSION_ID,
  //     token: TOKEN,
  //   });
    
  // } else {
  //   fetch(SAMPLE_SERVER_BASE_URL + '/session')
  //     .then(data => data.json())
  //     .then(setCredentials)
  //     .catch((err) => {
  //       console.error('Failed to get session credentials', err);
  //       alert('Failed to get opentok sessionId and token. Make sure you have updated the config.js file.');
  //     });
  // }
  
  // })

  return(

    <VideoCall credentials={credentials} />
)
}

