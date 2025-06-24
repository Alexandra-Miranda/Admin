import  { useState } from "react";
import "./searchBarStyle.css";
import { useBuscarEmpresas } from "../../src/API/buscarEmpresa"; 
import { useNavigate } from "react-router-dom";

export default function BuscarEmpresas() {
  const { empresas, carregando } = useBuscarEmpresas();
  const [pesquisa, setPesquisa] = useState("");
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const navigate = useNavigate();

  const empresasFiltradas = empresas.filter((empresa) =>
    empresa.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const irParaPerfil = (id: string) => {
    navigate(`/admin/empresa/${id}`);
    setPesquisa("");
    setMostrarSugestoes(false);
  };

  return (
    <div className="barra-pesquisa-container">
      <input
        type="text"
        placeholder="Pesquisar empresas"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        onFocus={() => setMostrarSugestoes(true)}
        className="barra-pesquisa"
      />

      {pesquisa && (
        <span className="fechar-btn" onClick={() => setPesquisa("")}></span>
      )}

      {mostrarSugestoes && pesquisa && (
        <div className="sugestoes-container">
          {carregando ? (
            <div className="sugestao-item">Carregando...</div>
          ) : empresasFiltradas.length === 0 ? (
            <div className="sugestao-item">Nenhuma empresa encontrada.</div>
          ) : (
            empresasFiltradas.map((empresa) => (
              <div
                key={empresa.id}
                className="sugestao-item"
                onClick={() => irParaPerfil(empresa.id)}
              >
                <img
                  src={empresa.imagem || "/default.png"}
                  alt={empresa.nome}
                  className="icone-empresa"
                />
                <span>{empresa.nome}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}




