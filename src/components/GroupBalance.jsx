//GroupBalance.jsx
import { getUserByEmail } from '../utils/apiLagunpay';
import { useEffect, useState } from 'react';
import UpdateTransaction from './UpdateTransaction';
import { useNavigate } from 'react-router-dom';


const GroupBalance = ({ group }) => {
  const [debtsWithUsers, setDebtsWithUsers] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const navigate = useNavigate();



  // Inicializa el balance de cada usuario en 0
  const balances = group.users.reduce((acc, user) => ({ ...acc, [user]: 0 }), {});

  group.transactions.forEach(transaction => {
    // Resta el monto de la transacción al balance del usuario que pagó
    balances[transaction.user] -= transaction.amount;

    // Divide el monto de la transacción entre los beneficiarios si la repartición es igual
    const equalRepartition = transaction.beneficiaryAndRepartition.find(b => b.amount === 'equal');
    if (equalRepartition) {
      const amountPerUser = transaction.amount / transaction.beneficiaryAndRepartition.length;
      transaction.beneficiaryAndRepartition.forEach(b => {
        balances[b.email] += amountPerUser;
      });
    } else {
      // Suma el monto correspondiente al balance de cada beneficiario
      transaction.beneficiaryAndRepartition.forEach(b => {
        balances[b.email] += b.amount;
      });
    }
  });

// Separa los usuarios que deben pagar de los que deben cobrar
const payers = Object.entries(balances).filter(([user, balance]) => balance < 0).map(([user, balance]) => ({ user, balance: -balance }));
const receivers = Object.entries(balances).filter(([user, balance]) => balance > 0).map(([user, balance]) => ({ user, balance }));

// Resuelve las deudas
const debts = [];
payers.forEach(payer => {
  while (payer.balance > 0) {
    const receiver = receivers.find(receiver => receiver.balance > 0);
    if (!receiver) {
      break; // No hay más receptores, por lo que salimos del bucle
    }
    const amount = Math.min(payer.balance, receiver.balance);
    debts.push({ from: payer.user, to: receiver.user, amount });
    payer.balance -= amount;
    receiver.balance -= amount;
  }
});

useEffect(() => {
  if (debts) {
    Promise.all(debts.map(debt => Promise.all([getUserByEmail(debt.to), getUserByEmail(debt.from)])))
      .then(debtsWithUsers => debtsWithUsers.map(([to, from], index) => ({ ...debts[index], to, from })))
      .then(setDebtsWithUsers)
      .catch(console.error);
  }
}, [debts]);


return (
  <>
  <div>
    <h2>Liquidación de cuentas</h2>
    {debtsWithUsers.map((debt, index) => (
  <p key={index}>{debt.to.username} debe a {debt.from.username} {debt.amount/100} €</p>
))}
  </div>
  <h2>Transacciones del grupo</h2>
  <ul>
    {group.transactions.map((transaction, index) => (
      <li key={index}>
        <p>Fecha: {transaction.date.substring(0, 10)}</p>
        <p>Descripción: {transaction.description}</p>
        <p>Importe: {transaction.amount/100} €</p>
        <p>Pagador: {transaction.user}</p>
        <p>ID:{transaction._id}</p>
        <p>Beneficiarios: {transaction.beneficiaryAndRepartition.map(b => b.email + "(" + b.amount + ")").join(', ')}</p>
        <button onClick={() => navigate(`/group/${group._id}/edit/transaction/${transaction._id}`)}>Editar transacción</button>
      </li>
    ))}
  </ul>
  </>
);
};

export default GroupBalance;