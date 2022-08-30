import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import Modal from 'react-modal'
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";

//definir quem é o elemento pai do modal, se nao for denido o modal será renderizado pelo body
Modal.setAppElement('#root')

export function App() {

  //controle do estado do modal
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  //função para abrir o modal
  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }
  //função para fechar o modal
  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }

  return (
    <>
      {/* aqui no header é passado a função que será executada pelo click do botao */}
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard />

      {/* importando o modal e definindo suas prorpiedades */}
      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <GlobalStyle />
    </>
  );
}
