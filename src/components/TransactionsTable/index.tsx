import { useTransaction } from "../../hooks/useTransaction";
import { Container } from "./styles";

export function TransactionsTable() {
    const { transactions } = useTransaction();

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
                                <td className={transaction.type}>
                                    {
                                        //INTL biblioteca para fazer formatação de valores (nao precisa ser instalada)
                                        new Intl.NumberFormat('pt-BR', {
                                            style: "currency",//fromatação do tipo moeda
                                            currency: "BRL"//tipo da moeda(real)
                                        }).format(transaction.amount)
                                    }
                                </td>
                                <td>{transaction.category}</td>
                                <td>

                                    {

                                        //INTL biblioteca para fazer formatação de valores (nao precisa ser instalada)
                                        new Intl.DateTimeFormat('pt-BR').format(
                                            new Date(transaction.createdAt)
                                        )
                                    }
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </Container>
    )
}