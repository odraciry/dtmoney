import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

interface Transaction{
    id: number,
    title: string,
    type: string,
    category: string,
    amount: number,
    createAt: string,
  }

export function TransactionsTable() {
    //array para guardar as transactions que vierem da api
    //estou determinando que o state armazena um array de Transaction
    const [transactions, setTransactions] = useState<Transaction[]>([])
    //busca dos dados na api fake
    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                {/* 
                    para cada conteudo em transactions eu retorno um conteudo html populado pela transaction
                */}
                    {transactions.map(transaction => {
                        return (
                            //toda vez que se faz um map é preciso definir uma key em seu primeiro elemento
                            <tr key={transaction.id}>
                                <td>{transaction.title}</td>
                                <td className={transaction.type}>{transaction.amount}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.createAt}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </Container>
    )
}