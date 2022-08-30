import { FormEvent, useState } from 'react';
import Modal from 'react-modal'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { api } from '../../services/api';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

//interface para definir as propriedades do modal
interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

//função para retornar o modal
export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const [title, setTitle] = useState('')
    const [value, setValue] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType] = useState('deposit')

    function handleCreateNewTransaction(event: FormEvent) {
        //isso faz com que o formulario nao faça as ações default, como recarregar a pagina
        event.preventDefault()

        const data = {
            title,
            category,
            value,
            type
        };
        
        api.post('/transactions', data)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            //classe para estilizar o fundo do modal e a "box" modal
            overlayClassName="react-modal-overlay"
            //classe para estilizar o conteudo dentro do modal
            className="react-modal-content"
        >

            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input
                    placeholder='Título'
                    value={title}
                    //função que executa toda vez que o valor do input mudar
                    //event.target.value para pegar o valor digitado no input
                    onChange={event => setTitle(event.target.value)}
                />

                <input
                    type='number'
                    placeholder='Valor'
                    value={value}
                    //função que executa toda vez que o valor do input mudar
                    //event.target.value para pegar o valor digitado no input
                    onChange={event => setValue(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type='button'
                        //seleciona que é a opção de deposito
                        onClick={() => { setType('deposit'); }}
                        //se a const type for igual a deposit, isActive é igual a true
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type='button'
                        //seleciona que é a opção de retirada
                        onClick={() => { setType('withdraw'); }}
                        //se a const type for igual a withdraw, isActive é igual a true
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                    placeholder='Categoria'
                    value={category}
                    //função que executa toda vez que o valor do input mudar
                    //event.target.value para pegar o valor digitado no input
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}