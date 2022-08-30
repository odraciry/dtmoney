import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';

//crianção de uma fake api para utilizar a aplicação sem o backend
//essas rotas são criadas graças ao miragejs
createServer({
  //utilizando o banco de dados do miragejs 
  models:{
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createAt: new Date('2022-09-01 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 980,
          createAt: new Date('2022-09-01 09:00:00'),
        }
      ]
    })
  },

  routes(){
    //referenciar a partir da parte da url referente a api
    this.namespace = 'api'

    this.get('/transactions', () => {
      //isso retorna todas as transactions que tem no banco de dados
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      //para guardar os dados enviados via metodo post
      const data = JSON.parse(request.requestBody)
      
      //schema é o banco de dados
      return schema.create('transaction', data)
    })
  },

})



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
