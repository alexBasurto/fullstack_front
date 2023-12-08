// Transactions.jsx

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function Transactions() {
  const [beneficiariesOption, setBeneficiariesOption] = useState('all');
  const [numBeneficiaries, setNumBeneficiaries] = useState(0);
  const [customBeneficiaries, setCustomBeneficiaries] = useState([]);

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

  return (
    <>
      <Header />
      <main>
          <h2>Ingresar nueva transacción</h2>
        <form action="post">
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
            <input type="text" name="user" />
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