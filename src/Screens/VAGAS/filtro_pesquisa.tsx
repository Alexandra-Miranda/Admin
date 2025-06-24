import React, { useState } from "react";

interface FilterOptions {
  status: string;
  area: string;
  date: string;
  sort: string;
}

const FiltrosEPesquisa: React.FC = () => {
  // State para o campo de pesquisa e os filtros
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<FilterOptions>({
    status: "todas",
    area: "todas",
    date: "todas",
    sort: "recentes",
  });

  // Função para atualizar os filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Função para lidar com a pesquisa
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="filtros-pesquisa">
      {/* Campo de Pesquisa */}
      <div className="campo-pesquisa">
        <label htmlFor="search">Buscar vagas:</label>
        <input
          type="text"
          id="search"
          placeholder="Digite o título, área ou palavra-chave..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filtros */}
      <div className="filtros">
        <div className="filtro">
          <label htmlFor="status">Status da vaga:</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="todas">Todas</option>
            <option value="aberta">Aberta</option>
            <option value="fechada">Fechada</option>
            <option value="em-analise">Em Análise</option>
          </select>
        </div>

        <div className="filtro">
          <label htmlFor="area">Área de atuação:</label>
          <select
            id="area"
            name="area"
            value={filters.area}
            onChange={handleFilterChange}
          >
            <option value="todas">Todas</option>
            <option value="administracao">Administração</option>
            <option value="ti">TI</option>
            <option value="marketing">Marketing</option>
            <option value="engenharia">Engenharia</option>
          </select>
        </div>

        <div className="filtro">
          <label htmlFor="date">Data de publicação:</label>
          <select
            id="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          >
            <option value="todas">Todas</option>
            <option value="ultima-semana">Última semana</option>
            <option value="ultimo-mes">Último mês</option>
          </select>
        </div>
      </div>

      {/* Ordenação */}
      <div className="ordenacao">
        <label htmlFor="sort">Ordenar por:</label>
        <select
          id="sort"
          name="sort"
          value={filters.sort}
          onChange={handleFilterChange}
        >
          <option value="recentes">Mais recentes</option>
          <option value="candidatos">Número de candidatos</option>
          <option value="prioridade">Prioridade</option>
        </select>
      </div>

      <style>{`
        .filtros-pesquisa {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .campo-pesquisa {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .campo-pesquisa input {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
        }

        .filtros {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .filtro {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
          min-width: 200px;
        }

        .ordenacao {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        select, input {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        label {
          font-size: 14px;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default FiltrosEPesquisa;