import { Container } from "./styles";
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransaction } from "../../hooks/useTransaction";

export function Summary() {
    //desta forma estou passando o valor que vem do TransactionContext para a const data
    const { transactions } = useTransaction();

    //reduce é uma função que passa por todos os valores do array e acumula esses valores
    //primeiro valor da função é o accumulator e o segundo é a posição do array
    const summary = transactions.reduce((acc, transaction) => {
        //se a transição for ddo tipo deposito ele irá somar os valores ao deposito e ao total
        //se nao ele ira somar os valores a saída e subtrair do total
        if (transaction.type === 'deposit') {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        } else {
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;
    },
        //valor inicial do reduce
        {
            deposits: 0,
            withdraws: 0,
            total: 0
        })

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {
                        new Intl.NumberFormat('pt-BR', {
                            style: "currency",//fromatação do tipo moeda
                            currency: "BRL"//tipo da moeda(real)
                        }).format(summary.deposits)
                    }
                </strong>
            </div>
            <div >
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>-
                    {
                        new Intl.NumberFormat('pt-BR', {
                            style: "currency",//fromatação do tipo moeda
                            currency: "BRL"//tipo da moeda(real)
                        }).format(summary.withdraws)
                    }
                </strong>
            </div>
            <div className="highLight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    {
                        new Intl.NumberFormat('pt-BR', {
                            style: "currency",//fromatação do tipo moeda
                            currency: "BRL"//tipo da moeda(real)
                        }).format(summary.total)
                    }
                </strong>
            </div>
        </Container>
    )
}