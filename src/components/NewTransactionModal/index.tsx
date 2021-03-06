import closeSVG from "../../assets/close.svg";
import incomeSVG from "../../assets/income.svg";
import outcomeSVG from "../../assets/outcome.svg";

import Modal from "react-modal";
import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement("#root");

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState("deposit");

  const { createTransaction } = useTransactions()  

  async function handleCreateNewTransaction(event:FormEvent){
    event.preventDefault()

    await createTransaction({
      title,
      amount,
      category,
      type
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('')

    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeSVG} className="Fechar modal" alt="icone de fechar" />
      </button>

      <Container onSubmit={(e) => handleCreateNewTransaction(e)}>
        <h2>Cadatrar Transação</h2>

        <input type="text" placeholder="Título" value={title} onChange={(event) => {setTitle(event.target.value)}} required/>

        <input type="number" placeholder="Valor" value={amount} onChange={(event) => {setAmount(Number(event.target.value))}} required/>

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor='green'
          >
            <img src={incomeSVG} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor='red'
          >
            <img src={outcomeSVG} alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input type="text" placeholder="Categoria" value={category} onChange={(event) => setCategory(event.target.value)} required/>

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
