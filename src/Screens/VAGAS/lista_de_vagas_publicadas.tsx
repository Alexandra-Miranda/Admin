import React from "react";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Buscar } from "../../API/buscar";
import "./lista_de_vagas_publicadasStyle.css";
import VagaModal from "../../Componentes/vagamodal"

type Resposta = {
    id: string;
    titulo: string;
    modalidade: string;
    descricao: string;
    beneficios: string[];
    responsabilidades: string[];
    habilidades: string[];
    remuneracao: boolean;
    criadoEm: string;
    atualizadoEm: Date;
    categoriaId: string;
    empresa: {
      criadoEm: Date;
      imagem: any;
      nome: string;
      morada: string;
    };
    numeroVagas: number;
  };
  
  const ListVagas: React.FC = () => {
      const [modalAberto, setModalAberto] = useState(false);
      const [vagaSelecionada, setVagaSelecionada] = useState<Resposta | null>(null);
      // const [searchTerm, setSearchTerm] = useState<string>("");
      const [data, setData] = useState<Resposta[]>([]);


  React.useEffect(() => {
    const pegarVagas = async () => {
      const { data } = await Buscar<Resposta[]>({ url: "/vagas/empresa" });
      setData(data ?? []);
    };

    pegarVagas();
  }, [modalAberto]);
  
 return(
    <div className="vagas-container">
      <h2>Vagas Publicadas</h2>
      <div className="vagas-list">
        {data.map((vagas, index) => (
          <div key={index} className="vagas-item">
            <div className="title">
              <h3>{vagas.titulo}</h3>
            </div>
            <p>Numero de vagas:{vagas.numeroVagas}</p>
            <p> {vagas.criadoEm}</p>
            {/* <img className="post-image" src={vagas.urlsMidia[0]} alt="Post" /> */}
            <div className="actions">
              <button onClick={() => { setModalAberto(true); setVagaSelecionada(vagas); }}>Visualizar</button>
              {/* <button>Editar</button> */}
              {/* <button>Apagar</button> */}
            </div>
          </div>
        ))}
      </div>
      <VagaModal isOpen={modalAberto} onClose={() => setModalAberto(false)} vaga={vagaSelecionada} />
    </div>
 );

};

export default ListVagas;
