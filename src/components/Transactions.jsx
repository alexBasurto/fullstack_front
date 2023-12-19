// Transactions.jsx

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { createTransaction } from '../utils/apiLagunpay';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserByEmail } from '../utils/apiLagunpay';
const VITE_BACKEND_HOST =
    import.meta.env.VITE_BACKEND_HOST || "http://localhost:3006";

function Transactions() {
  const [beneficiariesOption, setBeneficiariesOption] = useState('all');
  const [numBeneficiaries, setNumBeneficiaries] = useState(0);
  const [customBeneficiaries, setCustomBeneficiaries] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (beneficiariesOption === 'custom') {
      setCustomBeneficiaries(Array(parseInt(numBeneficiaries)).fill({ email: '', amount: '' }));
    }
  }, [beneficiariesOption, numBeneficiaries]);

  const handleBeneficiaryChange = (index, field, value) => {
    const newBeneficiaries = [...customBeneficiaries];
    newBeneficiaries[index][field] = value;
    setCustomBeneficiaries(newBeneficiaries);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.amount = parseFloat(data.amount);
    // ...
    try {
      const response = await createTransaction(id, data);
      const responseData = await response.json();
      console.log('Transacción creada', responseData);
      navigate(`/group/${id}`);

    } catch (error) {
      console.error('Error al crear transacción', error.message);
    }
  }


  const fetchGroupUsers = async (id) => {
    const response = await fetch(`${VITE_BACKEND_HOST}/groups/${id}`);
    const data = await response.json();
    const usersData = await Promise.all(data.users.map(user => getUserByEmail(user)));
    const users = await Promise.all(usersData.map(user => user.username));
    return users; 
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchGroupUsers(id).then(setUsers);
  }, [id]);





  return (
    <>
      <Header />
      <main>
          <h2>Ingresar nueva transacción</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Gasto:
            <input type="number" name="amount" />
          </label>
          <label>
            Descripción:
            <input type="text" name="description" />
          </label>
          <label>
            Fecha:
            <input type="date" name="date" />
          </label>
          <label>
            Pagador:
            <select name="user">
              {users.map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </label>
          <label>
            Beneficiarios:
            <select name="users" value={beneficiariesOption} onChange={e => setBeneficiariesOption(e.target.value)}>
              <option value="all">Todos por igual</option>
              <option value="custom">Personalizado</option>
            </select>
          </label>
          {beneficiariesOption === 'custom' && (
            <>
              <label>
                Número de beneficiarios:
                <input type="number" min="1" value={numBeneficiaries} onChange={e => setNumBeneficiaries(e.target.value)} />
              </label>
              {customBeneficiaries.map((beneficiary, index) => (
                <div key={index}>
                  <label>
                    Email:
                    <input type="email" value={beneficiary.email} onChange={e => handleBeneficiaryChange(index, 'email', e.target.value)} />
                  </label>
                  <label>
                    División:
                    <input type="number" value={beneficiary.amount} onChange={e => handleBeneficiaryChange(index, 'amount', e.target.value)} />
                  </label>
                </div>
            ))}
          </>
        )}
        <input type="submit" value="Registrar transacción" />
      </form>
    </main>
    <Footer />
    </>
  );
}

export default Transactions;