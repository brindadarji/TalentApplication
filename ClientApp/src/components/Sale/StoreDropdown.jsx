import React, { useState, useEffect } from 'react';

export function StoreDropdown ({ onSelectStore, value }) {
  const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');

    const handleChange = (_, { value }) => {
        onSelectStore(value);
    };

  useEffect(() => {
    fetch('/store/get')
      .then((response) => response.json())
      .then((data) => setStores(data))
      .catch((error) => console.error('Error fetching stores:', error));
  }, []);

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
    onSelectStore(e.target.value);
  };

  return (
      <select value={value} onChange={handleStoreChange}>
      <option value=""></option>
      {stores.map((store) => (
        <option key={store.id} value={store.id}>
          {store.name}
        </option>
      ))}
    </select>
  );
};

export default StoreDropdown;