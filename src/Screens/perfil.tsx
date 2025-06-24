import React from "react";
import "./perfilStyle.css";
import Sidebar from "../Componentes/Sidebar";
import Inicio from "../PERFIL/inicio";
import Sobre from "../PERFIL/sobre";
import PublicacoesTab from "../PERFIL/publicacoes";
import VagasTab from "../PERFIL/vagas";
import Editar from "../PERFIL/editar";
import Notificacoes from "../PERFIL/notificacoes";
import { Buscar } from "../API/buscar";

interface Post {
  id: string;
  titulo: string;
  urlsMidia?: string[];
  criadoEm: string;
}

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

type resposta = {
  id: string;
  nome: string;
  slogan: string;
  banner: string;
  imagem: string;
  email: string;
  telefone: string;
  provincia: string;
  municipio: string;
  morada: string;
  tipo: string;
  setor: string;
  tamanho: string;
  especializacoes: string;
  site: string;
  criadoEm: string;
  atualizadoEm: string;
  seguidores: string;
  vagas: Vaga[];
  posts: Post[];
};

export default function CompanyProfile() {
  const [activeTab, setActiveTab] = React.useState("Início");
  const [data, setData] = React.useState<resposta | null>(null);

  React.useEffect(() => {
    (async () => {
      const resultas = await Buscar<resposta>({ url: "/empresa/perfil" });
      setData(resultas.data);
    })();
  }, []);

  const handleDeletePost = (id: string) => {
    setData((prev) =>
      prev ? { ...prev, posts: prev.posts.filter((p) => p.id !== id) } : prev
    );
  };

  const handleDeleteVaga = (id: string) => {
    setData((prev) =>
      prev ? { ...prev, vagas: prev.vagas.filter((v) => v.id !== id) } : prev
    );
  };

  const renderTab = () => {
    if (!data) return null;

    switch (activeTab) {
      case "Início":
        return <Inicio />;
      case "Sobre":
        return <Sobre empresa={data} />;
      case "Publicações":
        return (
          <PublicacoesTab
            posts={data.posts}
            canDelete
            onDelete={(id) => console.log("Apagar post", id)}
          />
        );
      case "Vagas":
        return (
          <VagasTab
            vagas={data.vagas}
            canDelete
            onDelete={(id) => console.log("Apagar vaga", id)}
          />
        );
      case "Notificações":
        return <Notificacoes />;
      case "Editar":
        return <Editar />;
      default:
        return null;
    }
  };

  if (!data) {
    return null;
  }

  console.log(data);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={data.banner} alt="Banner" className="banner" />
        <img src={data.imagem} alt="Logo" className="logo" />
      </div>

      <div className="profile-content">
        <h2>{data.nome}</h2>
        <p className="subtitle">{data.slogan}</p>
        <p className="details">
          Comércio electrónico •{" "}
          {`${data.provincia}, ${data.municipio}, ${data.morada}`} •{" "}
          {data.seguidores} seguidores • + de 10 mil funcionários
        </p>

        <div className="tabs">
          {[
            "Início",
            "Sobre",
            "Publicações",
            "Vagas",
            "Notificações",
            "Editar",
          ].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content">{renderTab()}</div>
      </div>
      <Sidebar />
    </div>
  );
}
