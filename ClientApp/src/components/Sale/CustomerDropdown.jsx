import React, { useState, useEffect } from 'react';

export function CustomerDropdown({ onSelectCustomer, value }) {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');

    const handleChange = (_, { value }) => {
        onSelectCustomer(value);
    };

   useEffect(() => {
        fetch('/customer/get')
            .then((response) => response.json())
            .then((data) => setCustomers(data))
            .catch((error) => console.error('Error fetching customers:', error));
    }, []);

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
    onSelectCustomer(e.target.value);
  };

  return (
      <select value={value} onChange={handleCustomerChange}>
      <option value=""></option>
      {customers.map((customer) => (
        <option key={customer.id} value={customer.id}>
          {customer.name}
        </option>
      ))}
    </select>
  );
};

export default CustomerDropdown;