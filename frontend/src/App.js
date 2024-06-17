import React, { useState } from 'react';
import { Login, ClientTable } from 'components';

export const App = () => {
  const [fullName, setFullName] = useState('');

  return (
    <div>
      {!fullName ? (
        <Login setFullName={setFullName} />
      ) : (
        <div>
          <p>Добро пожаловать, {fullName}!</p>
          <ClientTable fullName={fullName} />
        </div>
      )}
    </div>
  );
};