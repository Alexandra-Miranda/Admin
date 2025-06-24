import React, { useState } from "react";
import "./comuni.css";
import AdminLayout from "../Componentes/AdminLayout";


export default function ComunicacaoDireta() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("todos");

  const enviarNotificacao = () => {
    if (!mensagem) return alert("Escreva uma mensagem antes de enviar.");

    alert(
      `Notificação enviada para: ${tipoUsuario === "todos" ? "todos os usuários" : tipoUsuario} \nMensagem: ${mensagem}`
    );

    setEmail("");
    setMensagem("");
    setTipoUsuario("todos");
  };

  return (
    <AdminLayout>
    <div className="comunicacao-container">
      <h2>Enviar Notificação</h2>

      <div className="form-comunicacao">
        <label>Tipo de Destinatário</label>
        <select
          value={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="empresa">Apenas Empresas</option>
          <option value="candidato">Apenas Candidatos</option>
          <option value="email">Por Email</option>
        </select>

        {tipoUsuario === "email" && (
          <input
            type="email"
            placeholder="Email do destinatário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        <textarea
          placeholder="Escreva a mensagem..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
        ></textarea>

        <button onClick={enviarNotificacao}>Enviar</button>
      </div>
    </div>
    </AdminLayout>
  );
}
