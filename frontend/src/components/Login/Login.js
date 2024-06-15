import { useState } from 'react';

export const Login = ({ setFullName }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   const response = await axios.post('http://localhost:5000/login', { username, password });
    //   setFullName(response.data.full_name);
    // } catch (error) {
    //   alert('Неверный логин или пароль');
    // }
  };

  return (
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
  );
}
