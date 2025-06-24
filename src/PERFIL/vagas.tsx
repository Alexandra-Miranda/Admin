import './vagasStyle.css';

interface Vaga {
  id: string;
  titulo: string;
  criadoEm: string;
  atualizadoEm: string;
  numeroVagas: number;
  empresa: {
    nome: string;
    morada: string;
    imagem?: string;
  };
}

interface VagasProps {
  vagas: Vaga[];
  canDelete?: boolean;
  onDelete?: (id: string) => void;
}

export default function VagasTab({ vagas, canDelete, onDelete }: VagasProps) {
  return (
    <div className="vagas-container">
      <h2>Vagas Publicadas</h2>
      <div className="vagas-list">
        {vagas.map((vaga) => (
          <div key={vaga.id} className="vagas-item">
            <div className="title">
              <h3>{vaga.titulo}</h3>
            </div>
            <p>Empresa: {vaga.empresa?.nome}</p>
            <p>Localização: {vaga.empresa?.morada}</p>
            <p>Vagas disponíveis: {vaga.numeroVagas}</p>
            <p>Criada em: {vaga.criadoEm}</p>
            <div className="actions">
              <button onClick={() => alert('Visualizar vaga')}>Visualizar</button>
              {canDelete && <button onClick={() => onDelete?.(vaga.id)}>🗑 Apagar</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
