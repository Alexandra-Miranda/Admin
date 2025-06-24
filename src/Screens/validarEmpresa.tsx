import React, { useEffect, useState } from "react";
import "./ValidarEmpresa.css";
import { Buscar } from "../API/buscar";
import AdminLayout from "../Componentes/AdminLayout";

interface Empresa {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  nif: string;
  provincia: string;
  municipio: string;
  morada: string;
  tipo: string;
  setor: string;
  tamanho: string;
  especializacoes: string;
  descricao?: string;
  slogan?: string;
  imagem?: string;
}

const ValidarEmpresas: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      const resposta = await Buscar<Empresa[]>({
        url: "/empresa/pendentes",
      });

      if (resposta?.data && Array.isArray(resposta.data)) {
        setEmpresas(resposta.data);
      } else {
        setEmpresas([]);
      }
    };

    fetchEmpresas();
  }, []);

  return (
    <AdminLayout>
    <div className="pagina-validar">
      <h2>Empresas Pendentes de Validação</h2>

      {empresas.length === 0 ? (
        <p className="nenhuma">Nenhuma empresa pendente.</p>
      ) : (
        <div className="lista-empresas">
          {empresas.map((empresa) => (
            <div className="empresa-card" key={empresa.id}>
              <div className="empresa-header">
                <img
                  src={empresa.imagem || "/default-logo.png"}
                  alt={empresa.nome}
                  className="empresa-logo"
                />
                <div>
                  <h3>{empresa.nome}</h3>
                  <p className="slogan">{empresa.slogan}</p>
                </div>
              </div>

              <div className="empresa-detalhes">
                <p>
                  <strong>Email:</strong> {empresa.email}
                </p>
                <p>
                  <strong>Telefone:</strong>{" "}
                  {empresa.telefone || "Não informado"}
                </p>
                <p>
                  <strong>NIF:</strong> {empresa.nif}
                </p>
                <p>
                  <strong>Localização:</strong> {empresa.municipio},{" "}
                  {empresa.provincia}
                </p>
                <p>
                  <strong>Morada:</strong> {empresa.morada}
                </p>
                <p>
                  <strong>Tipo:</strong> {empresa.tipo}
                </p>
                <p>
                  <strong>Setor:</strong> {empresa.setor}
                </p>
                <p>
                  <strong>Tamanho:</strong> {empresa.tamanho}
                </p>
                <p>
                  <strong>Especializações:</strong> {empresa.especializacoes}
                </p>
                <p>
                  <strong>Descrição:</strong> {empresa.descricao}
                </p>
              </div>

              <div className="empresa-acoes">
                <button className="aprovar">Aprovar</button>
                <button className="rejeitar">Rejeitar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default ValidarEmpresas;
