import { useState } from "react";
import "./denuStyle.css";
import AdminLayout from "../Componentes/AdminLayout";


interface Denuncia {
  id: string;
  denunciante: string;
  contra: string;
  tipo: "Publicação" | "Vaga" | "Perfil";
  motivo: string;
  data: string;
  status: "Pendente" | "Resolvida" | "Ignorada";
}

const denunciasMock: Denuncia[] = [
  {
    id: "1",
    denunciante: "João Silva",
    contra: "Empresa XYZ",
    tipo: "Vaga",
    motivo: "Conteúdo ofensivo",
    data: "20/06/2025",
    status: "Pendente",
  },
  {
    id: "2",
    denunciante: "Maria Lopes",
    contra: "Candidato Lucas",
    tipo: "Perfil",
    motivo: "Informações falsas",
    data: "19/06/2025",
    status: "Pendente",
  },
];

export default function GerenciarDenuncias() {
  const [denuncias, setDenuncias] = useState(denunciasMock);

  const atualizarStatus = (id: string, novoStatus: Denuncia["status"]) => {
    setDenuncias(denuncias.map((d) => (d.id === id ? { ...d, status: novoStatus } : d)));
  };

  return (
    <AdminLayout>
    <div className="denuncias-container">
      <h2>Gerenciamento de Denúncias</h2>

      <table className="tabela-denuncias">
        <thead>
          <tr>
            <th>Denunciante</th>
            <th>Contra</th>
            <th>Tipo</th>
            <th>Motivo</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {denuncias.map((d) => (
            <tr key={d.id}>
              <td>{d.denunciante}</td>
              <td>{d.contra}</td>
              <td>{d.tipo}</td>
              <td>{d.motivo}</td>
              <td>{d.data}</td>
              <td>{d.status}</td>
              <td>
                <button onClick={() => atualizarStatus(d.id, "Resolvida")} className="btn-sucesso">Resolver</button>
                <button onClick={() => atualizarStatus(d.id, "Ignorada")} className="btn-ignorar">Ignorar</button>
                <button className="btn-ver">Ver Conteúdo</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AdminLayout>
  );
}
