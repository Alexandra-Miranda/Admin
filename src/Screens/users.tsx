import { useState } from "react";
import "./userStyle.css";
import AdminLayout from "../Componentes/AdminLayout";


interface Usuario {
  id: string;
  nome: string;
  email: string;
  status: "ativo" | "suspenso" | "pendente";
  tipo: "Empresa" | "Candidato";
  historico: string[];
  logs: string[];
}

const listaUsuarios: Usuario[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao@email.com",
    status: "ativo",
    tipo: "Empresa",
    historico: ["Criou vaga", "Atualizou perfil"],
    logs: ["Login 12/06", "Logout 12/06"],
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    email: "maria@email.com",
    status: "suspenso",
    tipo: "Candidato",
    historico: ["Candidatou-se a vaga", "Comentou publicação"],
    logs: ["Login 11/06", "Logout 11/06"],
  },
];

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState(listaUsuarios);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");

  const filtrarUsuarios = () => {
    return usuarios.filter((u) => {
      const statusOk = filtroStatus === "todos" || u.status === filtroStatus;
      const tipoOk = filtroTipo === "todos" || u.tipo === filtroTipo;
      return statusOk && tipoOk;
    });
  };

  const alterarStatus = (id: string, novoStatus: Usuario["status"]) => {
    const atualizados = usuarios.map((u) =>
      u.id === id ? { ...u, status: novoStatus } : u
    );
    setUsuarios(atualizados);
  };

  const excluirUsuario = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
    }
  };

  const enviarNotificacao = (email: string) => {
    alert(`Notificação enviada para ${email}`);
  };

  return (
    <AdminLayout>
    <div className="usuarios-container">
      <h2>Gerenciamento de Usuários</h2>

      <div className="filtros">
        <div>
          <label>Status:</label>
          <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="ativo">Ativo</option>
            <option value="suspenso">Suspenso</option>
            <option value="pendente">Pendente</option>
          </select>
        </div>

        <div>
          <label>Tipo:</label>
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="Empresa">Empresa</option>
            <option value="Candidato">Candidato</option>
          </select>
        </div>
      </div>

      <table className="tabela-usuarios">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Histórico</th>
            <th>Logs</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrarUsuarios().map((u) => (
            <tr key={u.id}>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>{u.tipo}</td>
              <td>
                <select
                  value={u.status}
                  onChange={(e) =>
                    alterarStatus(u.id, e.target.value as Usuario["status"])
                  }
                >
                  <option value="ativo">Ativo</option>
                  <option value="suspenso">Suspenso</option>
                  <option value="pendente">Pendente</option>
                </select>
              </td>
              <td>
                <ul>
                  {u.historico.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {u.logs.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button
                  className="btn-notificar"
                  onClick={() => enviarNotificacao(u.email)}
                >
                  Notificar
                </button>
                <button className="btn-perfil">Ver Perfil</button>
                <button
                  className="btn-excluir"
                  onClick={() => excluirUsuario(u.id)}
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
