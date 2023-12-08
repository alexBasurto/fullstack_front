const groups=[
    {
    "_id": {
      "$oid": "656f3d5794044437a466482b"
    },
    "name": "Grupo 1",
    "description": "Quedada de amigos",
    "users": [
      "jon@lagunpay.eus",
      "victor@lagunpay.eus",
      "alex@lagunpay.eus"
    ],
    "createdAt": {
      "$date": "2023-12-05T15:10:15.736Z"
    },
    "updatedAt": {
      "$date": "2023-12-05T15:10:15.736Z"
    },
    "active": true,
    "owner": "admin",
    "transactions": [
      {
        "amount": 1000,
        "description": "Desayunos",
        "date": "2023-12-05",
        "hour": "10:00",
        "user": "jon@lagunpay.eus",
        "beneficiaryAndRepartition": [
          {
            "email": "victor@lagunpay.eus",
            "amount": 500
          },
          {
            "email": "jon@lagunpay.eus",
            "amount": 300
          },
          {
            "email": "alex@lagunpay.eus",
            "amount": 200
          }
        ]
      },
      {
        "amount": 2000,
        "description": "Comida",
        "date": "2023-12-05",
        "hour": "14:00",
        "user": "victor@lagunpay.eus",
        "beneficiaryAndRepartition": [
          {
            "email": "victor@lagunpay.eus",
            "amount": "equal"
          },
          {
            "email": "jon@lagunpay.eus",
            "amount": "equal"
          },
          {
            "email": "alex@lagunpay.eus",
            "amount": "equal"
          }
        ]
      }
    ]
  },
  {
    "_id": {
      "$oid": "656f3d5794044437a466482c"
    },
    "name": "Grupo 2",
    "description": "Despedida bootcamp",
    "users": [
      "jon@lagunpay.eus",
      "victor@lagunpay.eus",
      "alex@lagunpay.eus",
      "mikel@lagunpay.eus",
      "david@lagunpay.eus",
      "ander@lagunpay.eus",
      "ester@lagunpay.eus",
      "danel@lagunpay.eus",
      "jesus@lagunpay.eus"
    ],
    "createdAt": {
      "$date": "2023-12-05T15:10:15.736Z"
    },
    "updatedAt": {
      "$date": "2023-12-05T15:10:15.736Z"
    },
    "active": true,
    "owner": "admin",
    "transactions": [
      {
        "amount": 18000,
        "description": "Desayunos",
        "date": "2023-12-05",
        "hour": "10:00",
        "user": "danel@lagunpay.eus",
        "beneficiaryAndRepartition": [
          {
            "email": "jon@lagunpay.eus",
            "amount": 2000
          },
          {
            "email": "victor@lagunpay.eus",
            "amount": 2000
          },
          {
            "email": "alex@lagunpay.eus",
            "amount": 2000
          },
          {
            "email": "mikel@lagunpay.eus",
            "amount": 2000
          },
          {
            "email": "david@lagunpay.eus",
            "amount": 2000
          },
          {
            "email": "ander@lagunpay.eus",
            "amount": 2000
          },
          {
            "email": "ester@lagunpay.eus",
            "amount": 2000
          },
          {
            "email": "danel@lagunpay.eus",
            "amount": 3000
          },
          {
            "email": "jesus@lagunpay.eus",
            "amount": 1000
          }
        ]
      }
    ]
  },
  {
    "_id": {
      "$oid": "656f3d5794044437a466482d"
    },
    "name": "Grupo 3",
    "description": "Grupo de prueba",
    "users": [
      "jon@lagunpay.eus",
      "alex@lagunpay.eus"
    ],
    "createdAt": {
      "$date": "2023-12-05T15:10:15.736Z"
    },
    "updatedAt": {
      "$date": "2023-12-05T15:10:15.736Z"
    },
    "active": false,
    "owner": "admin",
    "transactions": [
      {
        "amount": 1000,
        "description": "Desayunos",
        "date": "2023-12-05",
        "hour": "10:00",
        "user": "alex@lagunpay.eus",
        "beneficiaryAndRepartition": [
          {
            "email": "jon@lagunpay.eus",
            "amount": 1000
          }
        ]
      }
    ]
  }]

  export default groups;