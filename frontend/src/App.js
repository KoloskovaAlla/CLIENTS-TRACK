import React, { useState } from 'react';
import { Login, ClientTable } from 'components';

export const App = () => {
  const [fullName, setFullName] = useState('');

  if (!fullName) return (
    <Login setFullName={setFullName} />
  )
  else return (
    <div>
      <p>{`Добро пожаловать, ${fullName}!`}</p>
      <ClientTable fullName={fullName} />
    </div>
  );
};
