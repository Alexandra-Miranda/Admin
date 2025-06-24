import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import "./visaogeralStyle.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AdminStats = () => {
  // Dados fictícios para demonstração
  const totalEmpresas = 48;
  const totalCandidatos = 312;
  const totalVagas = 92;
  const taxaPreenchimento = "78%";

  const vagasPorArea = {
    labels: ["TI", "Engenharia", "Marketing", "Educação", "Saúde"],
    datasets: [
      {
        label: "Vagas",
        data: [25, 15, 20, 10, 22],
        backgroundColor: "#007bff",
      },
    ],
  };

  const candidatosPorFaixa = {
    labels: ["18-24", "25-30", "31-40", "40+"],
    datasets: [
      {
        label: "Candidatos",
        data: [120, 80, 60, 52],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
      },
    ],
  };

  return (
    <div className="admin-stats-container">
      <h2>Painel de Estatísticas</h2>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total de Empresas</h3>
          <p>{totalEmpresas}</p>
        </div>
        <div className="stat-card">
          <h3>Total de Candidatos</h3>
          <p>{totalCandidatos}</p>
        </div>
        <div className="stat-card">
          <h3>Total de Vagas Ativas</h3>
          <p>{totalVagas}</p>
        </div>
        <div className="stat-card">
          <h3>Taxa de Preenchimento</h3>
          <p>{taxaPreenchimento}</p>
        </div>
      </div>

      <div className="stats-charts">
        <div className="chart-box">
          <h4>Distribuição de Vagas por Área</h4>
          <Bar data={vagasPorArea} />
        </div>

        <div className="chart-box">
          <h4>Faixa Etária dos Candidatos</h4>
          <Pie data={candidatosPorFaixa} />
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
