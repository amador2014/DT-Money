import Modal from "react-modal";
import { Container } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement("#root");

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay" 
      className="react-modal-content"  
    >

      <Container>
        <h1>Cadatrar Transação</h1>

        <input type="text" placeholder="Título" />

        <input type="number" placeholder="Valor" />

        <input type="text" placeholder="Categoria" />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}