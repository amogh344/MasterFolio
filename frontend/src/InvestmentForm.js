// import React, { useState } from 'react';
// import axios from 'axios';
// import './InvestmentForm.css';

// const InvestmentForm = ({ onAdd }) => {
//   const [formData, setFormData] = useState({
//     type: '',
//     symbol: '',
//     name: '',
//     quantity: ''
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.type || !formData.name || !formData.quantity) {
//       setError('Please fill all required fields.');
//       return;
//     }

//     if (isNaN(parseFloat(formData.quantity)) || parseFloat(formData.quantity) <= 0) {
//       setError('Quantity must be a positive number.');
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:5050/api/investments', {
//         ...formData,
//         quantity: parseFloat(formData.quantity)
//       });
//       if (onAdd) onAdd(res.data);
//       setFormData({ type: '', symbol: '', name: '', quantity: '' });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add investment');
//     }
//   };

//   return (
//     <form className="investment-form" onSubmit={handleSubmit}>
//       <h2>Add Investment</h2>

//       {error && <p className="error">{error}</p>}

//       <label>Type</label>
//       <input
//         type="text"
//         name="type"
//         value={formData.type}
//         onChange={handleChange}
//         placeholder="e.g. Stock, Crypto"
//         required
//       />

//       <label>Symbol</label>
//       <input
//         type="text"
//         name="symbol"
//         value={formData.symbol}
//         onChange={handleChange}
//         placeholder="e.g. AAPL, BTC"
//       />

//       <label>Name</label>
//       <input
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Full name of investment"
//         required
//       />

//       <label>Quantity</label>
//       <input
//         type="number"
//         name="quantity"
//         value={formData.quantity}
//         onChange={handleChange}
//         placeholder="e.g. 10"
//         required
//       />

//       <button type="submit">Add Investment</button>
//     </form>
//   );
// };

// export default InvestmentForm;


import React, { useState } from 'react';
import axios from 'axios';
import './InvestmentForm.css';

const InvestmentForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    type: '',
    symbol: '',
    name: '',
    quantity: '',
    price: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { type, symbol, name, quantity, price } = formData;

    if (!type || !name || !quantity || !price) {
      setError('Please fill all required fields.');
      return;
    }

    const parsedQuantity = parseFloat(quantity);
    const parsedPrice = parseFloat(price);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      setError('Quantity must be a positive number.');
      return;
    }

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Price must be a positive number.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5050/api/investments', {
        type: type.trim(),
        symbol: symbol.trim(),
        name: name.trim(),
        quantity: parsedQuantity,
        price: parsedPrice
      });
      if (onAdd) onAdd(res.data);
      setFormData({ type: '', symbol: '', name: '', quantity: '', price: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add investment');
    }
  };

  return (
    <form className="investment-form" onSubmit={handleSubmit}>
      <h2>Add Investment</h2>

      {error && <p className="error">{error}</p>}

      <label>Type</label>
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="e.g. Stock, Crypto"
        required
      />

      <label>Symbol</label>
      <input
        type="text"
        name="symbol"
        value={formData.symbol}
        onChange={handleChange}
        placeholder="e.g. AAPL, BTC"
      />

      <label>Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full name of investment"
        required
      />

      <label>Quantity</label>
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="e.g. 10"
        required
      />

      <label>Price per Unit</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="e.g. 154.50"
        required
      />

      <button type="submit">Add Investment</button>
    </form>
  );
};

export default InvestmentForm;
