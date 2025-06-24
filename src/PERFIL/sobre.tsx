import './sobreStyle.css';
import { Buscar } from "../API/buscar";

interface EmpresaProps {
  empresa: {
    nome: string;
    site: string;
    descricao?: string; // se não estiver vindo do back, deixe opcional
    setor: string;
    tamanho: string;
    tipo: string;
    provincia: string;
    municipio: string;
    morada: string;
    criadoEm: string;
    especializacoes: string;
  } | null;
}

export default function SobreTab({ empresa }: EmpresaProps) {

  if (!empresa) {
    return;
  }

  return (
    <div className="sobre-tab">
      <h3 className="titulo">Visão geral</h3>
      <p className="descricao">
      {empresa.descricao}
      </p>
      <a href={empresa.site} target="_blank" rel="noopener noreferrer" className="link">
          {empresa.site}
      </a>

      <div className="info-extra">
        <div>
          <h4>Página verificada</h4>
          <p>{new Date(empresa.criadoEm).toLocaleDateString("pt-BR")}</p>
        </div>
        <div>
          <h4>Setor</h4>
          <p> {empresa.setor} </p>
        </div>
        <div>
          <h4>Tamanho da empresa</h4>
          <p>{empresa.tamanho}</p>
        </div>
        <div>
          <h4>Sede</h4>
          <p>{empresa.provincia}, {empresa.municipio}</p>
        </div>
        <div>
          <h4>Tipo</h4>
          <p>{empresa.tipo}</p>
        </div>
        <div>
          <h4>Fundada em</h4>
          <p>{new Date(empresa.criadoEm).getFullYear()}</p>
        </div>
        <div>
          <h4>Especializações</h4>
          <p>{empresa.especializacoes}</p>
        </div>
      </div>
    </div>
  );
}
