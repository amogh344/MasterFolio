// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './InvestmentList.css';

// const InvestmentList = () => {
//   const [investments, setInvestments] = useState([]);

//   const fetchInvestments = async () => {
//     try {
//       const res = await axios.get('http://localhost:5050/api/investments');
//       setInvestments(res.data);
//     } catch (err) {
//       console.error('Error fetching investments:', err.response?.data || err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5050/api/investments/${id}`);
//       setInvestments(prev => prev.filter(inv => inv._id !== id));
//     } catch (err) {
//       console.error('Error deleting investment:', err.response?.data || err.message);
//     }
//   };

//   const handleEdit = async (id, current) => {
//     const newType = prompt('Enter new type:', current.type);
//     if (newType === null || newType.trim() === '') return; // Cancel or empty

//     const newSymbol = prompt('Enter new symbol:', current.symbol);
//     if (newSymbol === null) return; // Cancel

//     const newName = prompt('Enter new name:', current.name);
//     if (newName === null || newName.trim() === '') return;

//     const newQuantityStr = prompt('Enter new quantity:', current.quantity);
//     if (newQuantityStr === null) return;

//     const newQuantity = parseFloat(newQuantityStr);
//     if (isNaN(newQuantity) || newQuantity <= 0) {
//       alert('Quantity must be a positive number.');
//       return;
//     }

//     const updated = {
//       type: newType.trim(),
//       symbol: newSymbol.trim(),
//       name: newName.trim(),
//       quantity: newQuantity,
//     };

//     try {
//       const res = await axios.put(`http://localhost:5050/api/investments/${id}`, updated);
//       setInvestments(prev => prev.map(inv => (inv._id === id ? res.data : inv)));
//     } catch (err) {
//       console.error('Error updating investment:', err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchInvestments();
//   }, []);

//   return (
//     <div className="investment-list">
//       <h2>Investments</h2>
//       {investments.length === 0 ? (
//         <p>No investments found.</p>
//       ) : (
//         <ul>
//           {investments.map(inv => (
//             <li key={inv._id} className="investment-item">
//               <strong>{inv.name || inv.symbol}</strong> ({inv.type}) - Quantity: {inv.quantity}
//               <div className="investment-controls">
//                 <button onClick={() => handleEdit(inv._id, inv)}>Edit</button>
//                 <button onClick={() => handleDelete(inv._id)}>Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default InvestmentList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InvestmentList.css';

const InvestmentList = () => {
  const [investments, setInvestments] = useState([]);

  const fetchInvestments = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/investments');
      setInvestments(res.data);
    } catch (err) {
      console.error('Error fetching investments:', err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/investments/${id}`);
      setInvestments(prev => prev.filter(inv => inv._id !== id));
    } catch (err) {
      console.error('Error deleting investment:', err.response?.data || err.message);
    }
  };

  const handleEdit = async (id, current) => {
    const newType = prompt('Enter new type:', current.type);
    if (newType === null || newType.trim() === '') return;

    const newSymbol = prompt('Enter new symbol:', current.symbol);
    if (newSymbol === null) return;

    const newName = prompt('Enter new name:', current.name);
    if (newName === null || newName.trim() === '') return;

    const newQuantityStr = prompt('Enter new quantity:', current.quantity);
    if (newQuantityStr === null) return;

    const newPriceStr = prompt('Enter new price:', current.price);
    if (newPriceStr === null) return;

    const newQuantity = parseFloat(newQuantityStr);
    const newPrice = parseFloat(newPriceStr);

    if (isNaN(newQuantity) || newQuantity <= 0 || isNaN(newPrice) || newPrice <= 0) {
      alert('Quantity and price must be positive numbers.');
      return;
    }

    const updated = {
      type: newType.trim(),
      symbol: newSymbol.trim(),
      name: newName.trim(),
      quantity: newQuantity,
      price: newPrice
    };

    try {
      const res = await axios.put(`http://localhost:5050/api/investments/${id}`, updated);
      setInvestments(prev => prev.map(inv => (inv._id === id ? res.data : inv)));
    } catch (err) {
      console.error('Error updating investment:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  return (
    <div className="investment-list">
      <h2>Investments</h2>
      {investments.length === 0 ? (
        <p>No investments found.</p>
      ) : (
        <ul>
          {investments.map(inv => (
            <li key={inv._id} className="investment-item">
              <strong>{inv.name || inv.symbol}</strong> ({inv.type})<br />
              Quantity: {inv.quantity} × ₹{inv.price?.toFixed(2) || 0} <br />
              <span>Total: ₹{(inv.quantity * inv.price).toFixed(2)}</span>
              <div className="investment-controls">
                <button onClick={() => handleEdit(inv._id, inv)}>Edit</button>
                <button onClick={() => handleDelete(inv._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InvestmentList;
