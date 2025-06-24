import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import "./modalEditarCategoriaStyle.css";

interface ModalEditarCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  categoria: {
    id: string;
    nome: string;
    cor: string;
  } | null;
  onUpdate: (categoriaAtualizada: { id: string; nome: string; cor: string }) => void;
}

const ModalEditarCategoria: React.FC<ModalEditarCategoriaProps> = ({
  isOpen,
  onClose,
  categoria,
  onUpdate
}) => {
  const [nome, setNome] = useState("");
  const [cor, setCor] = useState("#000000");
  const [mostrarCor, setMostrarCor] = useState(false);

  useEffect(() => {
    if (categoria) {
      setNome(categoria.nome);
      setCor(categoria.cor);
    }
  }, [categoria]);

  const handleSubmit = () => {
    if (!nome.trim()) {
      alert("Por favor, insira o nome da categoria.");
      return;
    }

    if (categoria) {
      onUpdate({ id: categoria.id, nome, cor });
      onClose();
    }
  };

  if (!isOpen || !categoria) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Editar Categoria</h3>

        <input
          type="text"
          placeholder="Categoria..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <div className="color-picker-container">
          <button onClick={() => setMostrarCor(!mostrarCor)}>Escolher cor</button>
          <div
            className="color-preview"
            style={{ backgroundColor: cor }}
          ></div>
        </div>

        {mostrarCor && (
          <div className="colorful-wrapper">
            <HexColorPicker color={cor} onChange={setCor} />
          </div>
        )}

        <div className="modal-buttons">
          <button className="cancelar" onClick={onClose}>Cancelar</button>
          <button className="publicar" onClick={handleSubmit}>Actualizar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarCategoria;
