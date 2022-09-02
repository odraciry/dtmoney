import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
    id: number,
    title: string,
    type: string,
    category: string,
    amount: number,
    createdAt: string,
}

//criando um tipo com os mesmos campos da Transaction mas omitindo os campos id e createdAt
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionProviderProps {
    //tipando children para aceitar qualquer conteudo valido para o react
    children: ReactNode;
}

//interfdace para tipar TransactionContext
interface TransactionContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

//esse context armazena uma lista de transactions
const TransactionContext = createContext<TransactionContextData>(
    //forçando o react a entender que esse obj é do type TransactionContextData sem ter que passar valores
    {} as TransactionContextData
);

//desta forma estou criando um componente que fará a logica da transação
//e retornará os valores atraves do TransactionContext
export function TransactionProvider({ children }: TransactionProviderProps) {
    //array para guardar as transactions que vierem da api
    //estou determinando que o state armazena um array de Transaction
    const [transactions, setTransactions] = useState<Transaction[]>([])
    //busca dos dados na api fake
    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])


    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        })
        const { transaction } = response.data

        setTransactions([...transactions, transaction]);
    }

    return (
        //estou passando o valor de transactions para o context, que será returnado e utilizado por outros componentes
        <TransactionContext.Provider value={{ transactions, createTransaction }}>
            {
                //dessa forma TransactionProvider pode receber elementos filhos de qualquer valor valido pro react
                children
            }
        </TransactionContext.Provider>
    )
}

//hook criando para retornar o context e facilitar as importações
//desta forma não precisa importar o  TransactionContext e o useContext
//serve apenas para organizar o codigo
export function useTransaction() {
    const context = useContext(TransactionContext);

    return context;
}