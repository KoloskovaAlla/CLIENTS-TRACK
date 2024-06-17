import{ useState, useEffect } from 'react';

export const ClientTable = ({ fullName }) => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/clients?responsible=${fullName}`);
        const data = await response.json();
        if (response.ok) {
          setClients(data.clients);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Ошибка при загрузке клиентов');
      }
    };

    fetchClients();
  }, [fullName]);

  const handleStatusChange = async (clientId, newStatus) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/clients/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setClients(clients.map(client => 
          client.id === clientId ? { ...client, status: newStatus } : client
        ));
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Ошибка при изменении статуса:', error);
      alert('Произошла ошибка при изменении статуса');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Клиенты</h2>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Статус</th>
            <th>Изменить статус</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.status}</td>
              <td>
                <select 
                  value={client.status} 
                  onChange={(e) => handleStatusChange(client.id, e.target.value)}
                >
                  <option value="В работе">В работе</option>
                  <option value="Отказ">Отказ</option>
                  <option value="Сделка закрыта">Сделка закрыта</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
