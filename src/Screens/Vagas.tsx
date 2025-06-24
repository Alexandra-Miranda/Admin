import React, { useEffect, useState } from "react";
import { fetchVagasAdmin, atualizarStatusVaga } from "../API/buscar";
import "./vgStyle.css";
import AdminLayout from "../Componentes/AdminLayout";


interface Vaga {
  id: string;
  titulo: string;
  empresa: { nome: string };
  categoria: { nome: string };
  status: "publicada" | "pendente" | "expirada" | "APROVADA" | "RECUSADA" | "ARQUIVADA";
  criadoEm: string;
}

export default function GerenciarVagas() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroArea, setFiltroArea] = useState("");
  const [filtroEmpresa, setFiltroEmpresa] = useState("");

  useEffect(() => {
    async function carregar() {
      const data = await fetchVagasAdmin();
      setVagas(data);
    }
    carregar();
  }, []);

  const handleStatus = async (id: string, novoStatus: Vaga["status"]) => {
    const sucesso = await atualizarStatusVaga(id, novoStatus as any);
    if (sucesso) {
      setVagas((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: novoStatus } : v))
      );
    }
  };

  const removerVaga = (id: string) => {
    if (confirm("Deseja realmente remover esta vaga?")) {
      setVagas((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const filtrarVagas = () => {
    return vagas.filter((vaga) => {
      const statusOk = filtroStatus === "todos" || vaga.status?.toLowerCase() === filtroStatus;
      const areaOk = !filtroArea || vaga.categoria?.nome?.toLowerCase().includes(filtroArea.toLowerCase());
      const empresaOk = !filtroEmpresa || vaga.empresa?.nome?.toLowerCase().includes(filtroEmpresa.toLowerCase());
      return statusOk && areaOk && empresaOk;
    });
  };

  return (
    <AdminLayout>
    <div className="vaga-container">
      <h2>Gerenciamento de Vagas</h2>

      <div className="filtros">
        <div>
          <label>Status:</label>
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="publicada">Publicadas</option>
            <option value="pendente">Pendentes</option>
            <option value="expirada">Expiradas</option>
          </select>
        </div>

        <div>
          <label>Área:</label>
          <input
            type="text"
            placeholder="Buscar por área"
            value={filtroArea}
            onChange={(e) => setFiltroArea(e.target.value)}
          />
        </div>

        <div>
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Buscar por empresa"
            value={filtroEmpresa}
            onChange={(e) => setFiltroEmpresa(e.target.value)}
          />
        </div>
      </div>

      <table className="tabela-vagas">
        <thead>
          <tr>
            <th>Título</th>
            <th>Empresa</th>
            <th>Área</th>
            <th>Status</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrarVagas().map((vaga) => (
            <tr key={vaga.id}>
              <td>{vaga.titulo}</td>
              <td>{vaga.empresa?.nome}</td>
              <td>{vaga.categoria?.nome}</td>
              <td>{vaga.status}</td>
              <td>{vaga.criadoEm}</td>
              <td>
                <button
                  onClick={() => handleStatus(vaga.id, "APROVADA")}
                  className="btn-aprovar"
                >
                  Aprovar
                </button>
                <button
                  onClick={() => handleStatus(vaga.id, "ARQUIVADA")}
                  className="btn-expirar"
                >
                  Arquivar
                </button>
                <button
                  onClick={() => removerVaga(vaga.id)}
                  className="btn-excluir"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AdminLayout>
  );
}
