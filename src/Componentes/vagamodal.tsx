import React, { useState } from "react";
import "./vagamodalStyle.css";
import { deletarVaga } from "../API/empresa";
import ModalEditVaga from "./modalEdit";

type Resposta = {
  id: string;
  titulo: string;
  modalidade: string;
  descricao: string;
  beneficios: string[];
  responsabilidades: string[];
  habilidades: string[];
  remuneracao: boolean;
  criadoEm: string;
  atualizadoEm: Date;
  categoriaId: string;
  empresa: {
    criadoEm: Date;
    imagem: any;
    nome: string;
    morada: string;
  };
  numeroVagas: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  vaga: Resposta | null; // Tipa conforme tua estrutura real
};

const VagaModal: React.FC<Props> = ({ isOpen, onClose, vaga }) => {

  const [open, setOpen] = useState<boolean>(false);

  const onDelete = async (id: string) => {
    const proceder = confirm("Tem certeza que quer realizar esta acção?");
    if (proceder) {
      const { erro, mensagem } = await deletarVaga(id);

      if (erro) {
        alert(erro);
      } else {
        alert(mensagem);
        onClose();
      }
    } else {
      alert("Acção cancelada.");
    }
  };

  if (!isOpen || !vaga) return null;

  return (
    <>
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{vaga.titulo}</h2>
        <div className="modal-section">
          <h3>Sobre a vaga</h3>
          <p>{vaga.descricao}</p>
        </div>
        <div className="modal-section">
          <h3>Perfis Pretendidos</h3>
          <p>{vaga.habilidades}</p>
        </div>
        <div className="modal-section">
          <h3>Responsabilidades</h3>
          <p>{vaga.responsabilidades}</p>
        </div>
        <div className="modal-section">
          <h3>Qualidades</h3>
          <p>{vaga.beneficios}</p>
        </div>
        <div className="modal-section">
          <h3>Número de vagas</h3>
          <p>{vaga.numeroVagas}</p>
        </div>
        <div className="modal-actions">
          <button className="btn-primary" onClick={() => onDelete(vaga.id)}>
            Eliminar
          </button>
          <button className="btn-primary" onClick={() => setOpen(true)} >Editar</button>
          <button className="btn-secondary" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
    <ModalEditVaga isOpen={open} onClose={() => setOpen(false)} data={vaga} />
    </>
  );
};

export default VagaModal;
