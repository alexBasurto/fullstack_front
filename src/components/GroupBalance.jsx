//GroupBalance.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getUserByEmail } from '../utils/apiLagunpay';


const GroupBalance = ({ group }) => {
  const [debtsWithUsers, setDebtsWithUsers] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const navigate = useNavigate();

  // Asegúrate de que las transacciones existen
  const transactions = group.transactions || [];

  // Calcula el balance de cada usuario
  const balances = {};
  transactions.forEach(transaction => {
    if (!balances[transaction.user]) {
      balances[transaction.user] = 0;
    }
    balances[transaction.user] += transaction.amount;
    transaction.beneficiaryAndRepartition.forEach(beneficiary => {
      if (!balances[beneficiary.email]) {
        balances[beneficiary.email] = 0;
      }
      balances[beneficiary.email] -= beneficiary.amount;
    });
  });

  // Separa a los usuarios en deudores y acreedores
  const debtors = Object.entries(balances).filter(([user, balance]) => balance < 0).map(([user, balance]) => ({ user, balance: -balance }));
  const creditors = Object.entries(balances).filter(([user, balance]) => balance > 0).map(([user, balance]) => ({ user, balance }));

  // Calcula las transacciones de liquidación
  const settlements = [];
  while (debtors.length > 0 && creditors.length > 0) {
    const debtor = debtors[0];
    const creditor = creditors[0];
    if (debtor.balance < creditor.balance) {
      settlements.push({ from: debtor.user, to: creditor.user, amount: debtor.balance });
      creditor.balance -= debtor.balance;
      debtors.shift();
    } else if (debtor.balance > creditor.balance) {
      settlements.push({ from: debtor.user, to: creditor.user, amount: creditor.balance });
      debtor.balance -= creditor.balance;
      creditors.shift();
    } else {
      settlements.push({ from: debtor.user, to: creditor.user, amount: debtor.balance });
      debtors.shift();
      creditors.shift();
    }
  }


// Antes de tu bloque de retorno, haz las solicitudes a la API para obtener los nombres de usuario
/* const fetchUsernames = async () => {
  for (let settlement of settlements) {
    const fromUser = await getUserByEmail(settlement.from);
    const toUser = await getUserByEmail(settlement.to);
    settlement.from = fromUser.username;
    settlement.to = toUser.username;
    console.log("settlement", settlement);
  }
};

fetchUsernames(); */

// Ahora, en tu bloque de retorno, `settlement.from` y `settlement.to` serán los nombres de usuario
return (
  <>
    <div>
      <h2>Liquidación de cuentas</h2>
      {settlements.map((settlement, index) => (
        <p key={index}>{settlement.from} debe a {settlement.to} {(settlement.amount/100).toFixed(2)} €</p>
      ))}
    </div>
    <h2>Transacciones del grupo</h2>
    <ul>
      {group.transactions.map((transaction, index) => (
        <li key={index}>
          <p>Descripción: {transaction.description}</p>
          <p>Fecha: {transaction.date.substring(0, 10)}</p>
          <p>Importe: {transaction.amount/100} €</p>
          <p>Pagador: {transaction.user}</p>
          <p>Beneficiarios:</p>
          <ul>
            {transaction.beneficiaryAndRepartition.map((beneficiary, index) => (
              <li key={index}>{beneficiary.email} - {(beneficiary.amount/100).toFixed(2)} €</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </>
);
};

export default GroupBalance;