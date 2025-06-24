import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buscar } from "../API/buscar";
import "./categoriasStyles.css";
import ModalEditarCategoria from "../Componentes/modalEditarCategoria";
import { ApagarCategoria } from "../API/apagar";



type Categoria = {
  id: string;
  nome: string;
  cor: string;
};

const Categorias: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria | null>(null);
  const navigate = useNavigate();
  
  const handleApagar = async (id: string) => {
    if (confirm("Deseja realmente apagar esta categoria?")) {
      try {
        await ApagarCategoria(id);
        setCategorias((prev) => prev.filter((c) => c.id !== id));
        alert("Categoria apagada com sucesso!");
      } catch {
        alert("Erro ao apagar categoria.");
      }
    }
  };
  // Abrir modal de edição
  const handleEditarCategoria = (categoria: Categoria) => {
    setCategoriaSelecionada(categoria);
    setModalAberto(true);
  };

  // Atualizar categoria após edição
  const handleUpdate = (categoriaAtualizada: Categoria) => {
    setCategorias((prev) =>
      prev.map((cat) => (cat.id === categoriaAtualizada.id ? categoriaAtualizada : cat))
    );
    setModalAberto(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      const { data } = await Buscar<Categoria[]>({ url: "/categorias" });
      setCategorias(data ?? []);
    };

    fetchCategorias();
  }, []);

  // const handleApagar = (id: string) => {
  //   if (confirm("Deseja realmente apagar esta categoria?")) {
  //     // Aqui podes chamar API de apagar
  //     setCategorias((prev) => prev.filter((c) => c.id !== id));
  //   }
  // };

  return (
    <div className="publicidades-container">
      <button onClick={handleBack} className="back-button">X</button>
      <h2>Categorias Cadastradas</h2>

      <div className="publicidade-list">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="publicidade-item">
            <p style={{ fontWeight: "bold" }}>{categoria.nome}</p>
            <div style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
              <span>Cor:</span>
              <div
                style={{
                  backgroundColor: categoria.cor,
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                  borderRadius: 4,
                  border: "1px solid #ccc"
                }}
              />
            </div>
            <div className="actions">
              <button onClick={() => handleEditarCategoria(categoria)}>Editar</button>
              <button onClick={() => handleApagar(categoria.id)}>Apagar</button>
            </div>
          </div>
        ))}
      </div>
      <ModalEditarCategoria
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        categoria={categoriaSelecionada}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default Categorias;
