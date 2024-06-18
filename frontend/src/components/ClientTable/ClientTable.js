import { useState, useEffect } from 'react';

export const ClientTable = ({ fullName }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/clients?responsible=${encodeURIComponent(fullName)}`);
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        } else {
          console.error('Ошибка при получении клиентов:', response.statusText);
        }
      } catch (error) {
        console.error('Ошибка при получении клиентов:', error);
      }
    };

    if (fullName) {
      fetchClients();
    }
  }, [fullName]);

  const handleStatusChange = async (client, status) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/clients/${client.account_number}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setClients((prevClients) =>
          prevClients.map((c) =>
            c.account_number === client.account_number ? { ...c, status } : c
          )
        );
      } else {
        console.error('Ошибка при обновлении статуса:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Статус</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.account_number}>
            <td>{`${client.last_name} ${client.first_name} ${client.patronymic}`}</td>
            <td>{client.status}</td>
            <td>
              <button onClick={() => handleStatusChange(client, 'В работе')}>В работе</button>
              <button onClick={() => handleStatusChange(client, 'Отказ')}>Отказ</button>
              <button onClick={() => handleStatusChange(client, 'Сделка закрыта')}>Сделка закрыта</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
