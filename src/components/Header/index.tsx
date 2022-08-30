import { useState } from 'react'
import logoImg from '../../assets/logo.svg'

import { Container, Content } from './style'

//propiedades que o header ira receber
interface HeaderProps {
    //essa propriedade será uma função, que será passada para o botao que fica no header, para executar o modal
    onOpenNewTransactionModal: () => void
}

export function Header({onOpenNewTransactionModal}: HeaderProps) {

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
            </Content>
        </Container>
    )
}