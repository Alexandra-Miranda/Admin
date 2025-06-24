import React from "react";
import "./perfilcandStyles.css"
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AreaData {
  area: string;
  applications: number;
}

const mockData: AreaData[] = [
  { area: 'Informática', applications: 120 },
  { area: 'Contrução Civil', applications: 95 },
  { area: 'Médicina', applications: 80 },
  { area: 'Direito', applications: 65 },
  { area: 'Docente', applications: 50 },
];

const perfilCandidatos: React.FC = () => {
  
  const data = {
    labels: ["16-18 anos", "19-21 anos", "22-24 anos", "25+ anos"],
    datasets: [
      {
        data: [45, 35, 15, 5], 
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#2F91D3", "#E85F7B", "#E6BC4D", "#3AA7A7"],
      },
    ],
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const total = context.dataset.data.reduce((acc: number, val: number) => acc + val, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${value} candidatos (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="faixa-etaria-dashboard">
      
      <div className="header_cand">
        <h2>Faixa Etária dos Candidatos</h2>
        <p>Distribuição das idades dos candidatos cadastrados no sistema.</p>
      </div>

      
      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Atividades mais frequentes</h2>
            <p className="text-sm text-gray-500 mb-6">
             As 5 atividades mais Frequentes
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
    </div>
  );
};

export default perfilCandidatos;