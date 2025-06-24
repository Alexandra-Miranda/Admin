import React, { useState } from "react";
import "./secondmodalStyle.css";
import { HexColorPicker } from "react-colorful";
import { CriarCategoria } from "../API/criar";
import * as FaIcons from "react-icons/fa"; // Font Awesome
import * as MdIcons from "react-icons/md"; // Material Design
import { IconType } from "react-icons";

interface ModalPublicarProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoriaCriada: (novaCategoria: any) => void;
}

const ModalPublicar: React.FC<ModalPublicarProps> = ({
  isOpen,
  onClose,
  onCategoriaCriada,
}) => {
  const [categoria, setCategoria] = useState("");
  const [cor, setCor] = useState("#aabbcc");
  const [iconeNome, setIconeNome] = useState("FaBriefcase");
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [buscaIcone, setBuscaIcone] = useState("");

  const todosIcones: { [key: string]: IconType } = {
    ...FaIcons,
    ...MdIcons,
  };

  const iconesFiltrados = Object.entries(todosIcones).filter(([nome]) =>
    nome.toLowerCase().includes(buscaIcone.toLowerCase())
  );

  const handleCriar = async () => {
    if (!categoria.trim()) return alert("Insira o nome.");

    try {
      const novaCategoria = await CriarCategoria({
        nome: categoria,
        cor,
        icon: iconeNome,
      });

      onCategoriaCriada(novaCategoria);
      onClose();
    } catch {
      alert("Erro ao criar categoria.");
    }
  };

  if (!isOpen) return null;

  const IconSelecionado = todosIcones[iconeNome];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Criar Categoria</h3>

        <textarea
          placeholder="Categoria..."
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <div className="file-buttons">
          <button
            type="button"
            className="choose-color-btn"
            onClick={() => setMostrarPicker(!mostrarPicker)}
          >
            Escolher cor
          </button>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: cor,
              border: "1px solid #ccc",
              marginLeft: 10,
              display: "inline-block",
            }}
          />
        </div>

        {mostrarPicker && (
          <div style={{ marginTop: 10 }}>
            <HexColorPicker color={cor} onChange={setCor} />
          </div>
        )}

        {/* Pesquisar e selecionar ícone */}
        <h4 style={{ marginTop: 20 }}>Escolher ícone</h4>
        <input
          type="text"
          placeholder="Buscar ícone..."
          value={buscaIcone}
          onChange={(e) => setBuscaIcone(e.target.value)}
          style={{ marginBottom: 10, width: "100%", padding: 5 }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 40px)",
            gap: 10,
            maxHeight: 150,
            overflowY: "scroll",
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 5,
          }}
        >
          {iconesFiltrados.slice(0, 50).map(([nome, IconComp]) => (
            <div
              key={nome}
              onClick={() => setIconeNome(nome)}
              style={{
                border: nome === iconeNome ? "2px solid blue" : "1px solid gray",
                padding: 5,
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              <IconComp size={20} />
            </div>
          ))}
        </div>

        <p style={{ marginTop: 10 }}>
          Ícone selecionado: <strong>{iconeNome}</strong>{" "}
          {IconSelecionado && <IconSelecionado size={20} />}
        </p>

        <div className="modal-actions" style={{ marginTop: 20 }}>
          <button type="button" className="cancel" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="submit" onClick={handleCriar}>
            Criar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPublicar;
