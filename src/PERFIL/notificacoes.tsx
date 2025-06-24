
import React from "react";
import "./notificacoesStyle.css";

const notificacoes = [
  { mensagem: "Candidato selecionado", data: "1º de janeiro de 2025" },
  { mensagem: "Candidato selecionado", data: "2 de janeiro de 2025" },
  { mensagem: "Candidato selecionado", data: "3 de janeiro de 2025" },
  { mensagem: "Candidato selecionado", data: "4 de janeiro de 2025" },
];

const NotificacoesEmpresa: React.FC = () => {
  return (
    <div className="notificacoes-container">
      <h2 className="titulo">Notificações</h2>
      <div className="lista">
        {notificacoes.map((item, index) => (
          <div key={index} className="notificacao-item">
            <span className="mensagem">{item.mensagem}</span>
            <span className="data">{item.data}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificacoesEmpresa;
