// import { Routes, Route } from 'react-router-dom';
// import { HomePage } from 'pages/HomePage'
// import { PodcastsPage } from 'pages/PodcastsPage';
// import { PodcastPage } from 'pages/PodcastPage';
import { useState } from 'react';
import { Login, ClientTable } from 'components';

export const App = () => {
  const [fullName, setFullName] = useState('');
  return (
    <>
      <Login fullName={fullName} setFullName={setFullName} />
      <ClientTable fullName={fullName} />
    </>
  );
};
