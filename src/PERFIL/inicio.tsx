
import './inicioStyle.css';

export default function InicioTab() {
  return (
    <div className="inicio-tab">
      <section className="destaque">
        <h3>Destaque</h3>
        <p>
        Fornecimento completo de soluções de infraestrutura de TI, software empresarial, automação comercial e bancária, com uma equipa técnica altamente qualificada e presença marcante nos principais setores da economia angolana
        </p>
      </section>

      <section className="publicacoes-recentes">
        <h3>Publicações recentes</h3>
        <div className="post">
          <p><strong>NCR Corporate:</strong> Temos novas vagas abertas! Verifica na aba "Vagas".</p>
          <span className="data">Há 3 dias</span>
        </div>
        <div className="post">
          <p><strong>NCR Corporate:</strong> Orgulhosos de apoiar a sustentabilidade nos aeroportos!</p>
          <span className="data">Há 1 semana</span>
        </div>
      </section>

      <section className="vagas-destaque">
        <h3>Vagas em destaque</h3>
        <div className="vaga">
          <h4>Agente de Tráfego</h4>
          <p>Luanda, Angola · Presencial</p>
          <span className="vaga-tipo">Tempo integral</span>
        </div>
        <div className="vaga">
          <h4>Operador de Equipamentos</h4>
          <p>Luanda, Angola · Presencial</p>
          <span className="vaga-tipo">Temporário</span>
        </div>
      </section>
    </div>
  );
}
