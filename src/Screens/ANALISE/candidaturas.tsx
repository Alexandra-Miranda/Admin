import React from "react";
import "./candidaturasStyle.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Candidaturas: React.FC = () => {
  // Média de candidatos por vaga
  const mediaCandidatos = 7.5;

  // Dados para o gráfico de barras
  const barData = {
    labels: ["Administração", "TI", "Marketing", "Engenharia", "Design"],
    datasets: [
      {
        label: "Candidatos por Vaga",
        data: [10, 15, 5, 8, 9],
        backgroundColor: "#28a745",
        borderColor: "#218838",
        borderWidth: 1,
      },
    ],
  };

  // Configurações do gráfico
  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top", // agora está corretamente tipado
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Número de Candidatos",
        },
      },
      x: {
        title: {
          display: true,
          text: "Áreas de Atuação",
        },
      },
    },
  };

  // Dados do gráfico
  const data = {
    labels: [
      "Falta de Experiência",
      "Perfil Incompatível",
      "Pouca Qualificação",
      "Falta de Interesse",
    ],
    datasets: [
      {
        label: "Ocorrências",
        data: [40, 35, 25, 10],
        backgroundColor: [
          "#FF6384", // Cor para Falta de Experiência
          "#36A2EB", // Cor para Perfil Incompatível
          "#FFCE56", // Cor para Pouca Qualificação
          "#4BC0C0", // Cor para Falta de Interesse
        ],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  // Configuração do gráfico
  const options = {
    indexAxis: "y" as const, // Gráfico de barra horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Esconde a legenda para simplificar
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw} ocorrências`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantidade de Ocorrências",
        },
      },
      y: {
        title: {
          display: true,
          text: "Motivos de Rejeição",
        },
      },
    },
  };

  return (
    <div className="candidaturas-dashboard">
      {/* Destaque do número médio */}
      <div className="highlight">
        <h2 className="title">Número Médio de Candidatos por Vaga</h2>
        <p className="description">
          A média atual de candidatos por vaga publicada em diferentes áreas.
        </p>
        <h1 className="average-number">{mediaCandidatos}</h1>
      </div>

      {/* Gráfico de Barras */}
      <div className="chart-container">
        <h3>Distribuição de Candidatos por Área de Atuação</h3>
        <div className="bar-chart">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <div className="motivos-rejeicao">
        {/* Título e descrição */}
        <div className="header">
          <h2>Motivos de Rejeição Mais Comuns</h2>
          <p>
            Analise os principais motivos pelos quais os candidatos têm sido
            rejeitados.
          </p>
        </div>

        {/* Gráfico de barras horizontal */}
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};
export default Candidaturas;
