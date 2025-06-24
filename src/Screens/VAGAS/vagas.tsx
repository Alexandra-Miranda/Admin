import React, { useState } from "react";
import "./vagasStyle.css"; 
import AdminLayout from "../../Componentes/AdminLayout";

export enum Cargo {
  Superadmin = "Superadmin",
  Moderador = "Moderador",
  Editor = "Editor",
  Leitor = "Leitor",
}

type Admin = {
  id: string;
  nome: string;
  email: string;
  cargo: Cargo;
};

const permissoesExemplo: Admin[] = [
  { id: "1", nome: "João Silva", email: "joao@admin.com", cargo: Cargo.Superadmin },
  { id: "2", nome: "Ana Costa", email: "ana@admin.com", cargo: Cargo.Editor },
  { id: "3", nome: "Carlos Mendes", email: "carlos@admin.com", cargo: Cargo.Moderador },
];

export default function AdminPermissions() {
  const [admins, setAdmins] = useState<Admin[]>(permissoesExemplo);
  const [novoAdmin, setNovoAdmin] = useState<{ nome: string; email: string; cargo: Cargo }>({
    nome: "",
    email: "",
    cargo: Cargo.Leitor,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNovoAdmin({ ...novoAdmin, [name]: value } as typeof novoAdmin);
  };

  const adicionarAdmin = () => {
    if (!novoAdmin.nome || !novoAdmin.email) {
      alert("Preencha todos os campos!");
      return;
    }

    const novo: Admin = {
      ...novoAdmin,
      id: Date.now().toString(),
    };

    setAdmins([...admins, novo]);
    setNovoAdmin({ nome: "", email: "", cargo: Cargo.Leitor });
  };

  const removerAdmin = (id: string) => {
    const confirmar = confirm("Tem certeza que deseja remover este administrador?");
    if (confirmar) setAdmins(admins.filter((admin) => admin.id !== id));
  };

  return (
    <AdminLayout>
    <div className="admin-permissions-container">
      <h2 className="title">Permissões dos Administradores</h2>

      <div className="form-novo-admin">
        <input
          type="text"
          name="nome"
          placeholder="Nome do Admin"
          value={novoAdmin.nome}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={novoAdmin.email}
          onChange={handleChange}
        />
        <select
          name="cargo"
          value={novoAdmin.cargo}
          onChange={(e) => setNovoAdmin({ ...novoAdmin, cargo: e.target.value as Cargo })}
        >
          <option value="">Selecione o cargo</option>
          <option value={Cargo.Superadmin}>Superadmin</option>
          <option value={Cargo.Moderador}>Moderador</option>
          <option value={Cargo.Editor}>Editor</option>
          <option value={Cargo.Leitor}>Leitor</option>
        </select>

        <button className="btn-adicionar" onClick={adicionarAdmin}>Adicionar</button>
      </div>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.nome}</td>
                <td>{admin.email}</td>
                <td>
                  <span className={`tag ${admin.cargo.toLowerCase()}`}>{admin.cargo}</span>
                </td>
                <td>
                  <button className="btn-remover" onClick={() => removerAdmin(admin.id)}>
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </AdminLayout>
  );
}
