//GroupBalance.jsx

import React from 'react';

const GroupBalance = ({ group }) => {
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

  return (
    <div>
      <h2>Balance del grupo {group.name}</h2>
      {group.users.map(user => (
        <div key={user}>
          <h3>{user}</h3>
          <p>{balances[user] > 0 ? `Debe cobrar ${balances[user]}` : `Debe pagar ${-balances[user]}`}</p>
        </div>
      ))}
    </div>
  );
};

export default GroupBalance;