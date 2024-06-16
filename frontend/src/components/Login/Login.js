import { useState } from 'react';

export const Login = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {        
        setFullName(data.user.full_name);
        console.log('Запрос отправлен');
      } else {
        alert('Неверный логин или пароль');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      alert('Произошла ошибка при попытке входа');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {fullName && <p>Welcome, {fullName}!</p>}
    </div>
  );
};

