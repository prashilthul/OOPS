// components/CreateManager.js
import { useState } from 'react';

const CreateManager = () => {
  const [managerName, setManagerName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [message, setMessage] = useState('');

  const createManager = async () => {
    try {
      const res = await fetch('/api/managers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: managerName, email: managerEmail }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(`Manager ${data.name} created successfully!`);
      } else {
        const error = await res.json();
        setMessage(`Error: ${error.detail}`);
      }
    } catch (err) {
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <h1>Create Manager</h1>
      <input
        type="text"
        placeholder="Manager Name"
        value={managerName}
        onChange={(e) => setManagerName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Manager Email"
        value={managerEmail}
        onChange={(e) => setManagerEmail(e.target.value)}
      />
      <button onClick={createManager}>Create Manager</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateManager;
