import classes from './Login.module.scss';
import { useState } from 'react';

export const Login = ({ fullName, setFullName }) => {
  
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

  const onUsernameChange = (event) => setUsername(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.userName}>
          
          <input 
            type="text" 
            value={username} 
            onChange={onUsernameChange} 
            placeholder="Логин"
          />
        </label>        
        <label className={classes.password}>
          
          <input 
            type="password" 
            value={password} 
            onChange={onPasswordChange}
            placeholder="Пароль"
          />
        </label>        
        <button className={classes.submit} type="submit">Login</button>
      </form>
      {fullName && <p>Добро пожаловать, {fullName}!</p>}
    </div>
  );
};

