//UpdateTransaction.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const VITE_BACKEND_HOST =
    import.meta.env.VITE_BACKEND_HOST || "http://localhost:3006";

const UpdateTransaction = () => {
  const [transaction, setTransaction] = useState(null);
  const { id } = useParams();
const { transactionId } = useParams();

  useEffect(() => {
    fetchTransaction();
  }, [transactionId]);

  const fetchTransaction = async () => {
    const group = await fetch(`${VITE_BACKEND_HOST}/groups/${id}`);
    const data = await group.json();
    const transaction = data.transactions.find(transaction => transaction._id === transactionId);
    console.log("TRANSACTION", id, transactionId);
    console.log ("DATA", data);

    setTransaction(transaction);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${VITE_BACKEND_HOST}/groups/${id}/transactions/${transactionId}/edit`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const handleInputChange = (event) => {
    console.log(event.target.name);
    console.log(transaction);
    setTransaction({
      ...transaction,
      [event.target.name]: event.target.value
    });
  };

  



  return (
    <>
        <Header />
      <h2>Editar transacción</h2>
    {transaction ? (
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input type="text" name="description" value={transaction.description} onChange={handleInputChange} />
        </label>
        <label>
          Amount:
          <input type="number" name="amount" value={transaction.amount} onChange={handleInputChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={transaction.date} onChange={handleInputChange} />
        </label>
        <label>
          User:
          <input type="text" name="user" value={transaction.user} onChange={handleInputChange} />
        </label>
        <label>
  Beneficiaries:
  {transaction.beneficiaryAndRepartition.map((beneficiary, index) => (
    <div key={index}>
      <label>
        Email:
        <input 
          type="text" 
          name={`${beneficiary.email}-email`} 
          value={beneficiary.email} 
          onChange={handleInputChange} 
        />
      </label>
      <label>
        Amount:
        <input 
          type="number" 
          name={`${beneficiary.email}-amount`} 
          value={beneficiary.amount} 
          onChange={handleInputChange} 
        />
      </label>
    </div>
  ))}
</label>
        <button type="submit">Editar</button>
      </form>
    ) : (
        <div>Loading...</div>
        )}
        <Footer />
    </>
  );

};

export default UpdateTransaction;