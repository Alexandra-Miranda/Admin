import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface JobData {
  totalJobs: number;
  filledJobs: number;
  highlightedJobs: number;
}

const jobStats: JobData = {
  totalJobs: 120,
  filledJobs: 102, // 85% preenchidas
  highlightedJobs: 5,
};

const COLORS = ['#4CAF50', '#E0E0E0']; // Cores para preenchidas e vagas abertas

const JobOverview: React.FC = () => {
  const filledPercentage = Math.round((jobStats.filledJobs / jobStats.totalJobs) * 100);
  const chartData = [
    { name: 'Preenchidas', value: jobStats.filledJobs },
    { name: 'Abertas', value: jobStats.totalJobs - jobStats.filledJobs },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Visão Geral das Vagas</h2>

      {/* Resumo das vagas */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-blue-600">{jobStats.totalJobs}</h3>
          <p className="text-gray-600">Total de Vagas Publicadas</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-green-600">{filledPercentage}%</h3>
          <p className="text-gray-600">Taxa de Preenchimento</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-red-600">{jobStats.highlightedJobs}</h3>
          <p className="text-gray-600">Vagas com Prioridade Alta</p>
        </div>
      </div>

      {/* Gráfico de status de preenchimento */}
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default JobOverview;