import React, { useState, useEffect } from 'react';

export function ProductDropdown ({ onSelectProduct, value }) {
  const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');

    const handleChange = (_, { value }) => {
        onSelectProduct(value);
    };

  useEffect(() => {
    fetch('/product/get')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    onSelectProduct(e.target.value);
  };

  return (
      
      <select value={value} onChange={handleProductChange}>
      <option value=""></option>
      {products.map((product) => (
        <option key={product.id} value={product.id}>
          {product.name}
        </option>
      ))}
    </select>
  );
};

export default ProductDropdown;