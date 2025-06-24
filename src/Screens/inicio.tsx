// import React from "react";
import "./inicioStyle.css";
import Image from "../image/ncr.png";
import publicarImg from "../image/publicar.jpg";
import Sidebar from "../Componentes/Sidebar";
import { useState } from "react";
import ModalCriarVaga from "../Componentes/modal";
import ModalPublicar from "../Componentes/secondmodal";
import { useNavigate } from 'react-router-dom';
import { image } from "@cloudinary/url-gen/qualifiers/source";
import SearchBar from "../Componentes/searchBar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [open, Setopen] = useState(false);
  const [isModalPubliOpen, setIsModalPubliOpen] = useState(false);

  return (
    <>
      <div className="container">
        {/* <header className="header">
          <div className="menu-icon">&#9776;</div>
          <div className="logo-container">
            <span className="logo-icon"></span>
            <span className="logo-text">AngoEstudios</span>
          </div>
          <div className="search-bar">
          <SearchBar empresas={[]} /> 
          </div>
          <div className="header-actions">
            <span className="help-icon">❔</span>
            <button className="create-button" onClick={() => Setopen(true)}>
              + Criar
            </button>
            <div className="profile-pic">
              <img src={Image} alt="profile-pic" className="profile-pic" />
            </div>
          </div>
        </header> */}

        <div className="content-container">
          <Sidebar />

          {/* Main content */}
          <main className="main">
            <div className="content-grid">
              {/* Upload Section */}
              <div className="card upload">
                <img
                  src={publicarImg}
                  alt="Publicar"
                  className="flutuando"
                  style={{
                    width: "100%",
                    maxHeight: 200,
                    objectFit: "contain",
                    marginBottom: 16,
                  }}
                />
                <p>Adicione categorias de forma interativa</p>
                <button
                  className="button"
                  onClick={() => setIsModalPubliOpen(true)}
                >
                  Criar Categoria
                </button>
              </div>

              {/*  Statistics Section */}
              <div className="stats-container">
                <h5>Estatísticas do canal</h5>
                <div className="subscribers">
                  <p>Vagas atuais</p>
                  <h3>Nº</h3>
                  <span className="growth">+2 nos últimos 28 dias</span>
                </div>

                <div className="summary">
                  <div className="divider" />
                  <h3>Resumo</h3>
                  <p>Últimos 28 dias</p>
                  <p>
                    Candidatos <strong>343</strong>
                  </p>
                </div>

                <div className="divider" />
                <div className="videos">
                  <h3>Vagas principais</h3>
                  <p>Últimas 48 horas - Candidaturas</p>
                  <ul>
                    <li>
                      (Nome empresa) Especificação da vaga - <strong>3</strong>
                    </li>
                    <li>
                      (Nome empresa) Especificação da vaga - <strong>2</strong>
                    </li>
                    <li>
                      (Nome empresa) Especificação da vaga- <strong>1</strong>
                    </li>
                  </ul>
                </div>
                <button className="stats-button">
                  Aceder às estatísticas do canal
                </button>
              </div>
            </div>

           
            <div className="content-grid">
              <div className="card-publi">
                <h4>Última publicação</h4>
                <div className="header-publi">
                  <img
                    className="profile-pic"
                    src={Image}
                    alt="Perfil"
                  />
                  <div>
                    <span className="category">Nome Empresa</span>
                    <span className="date">• (data)/20</span>
                  </div>
                </div>
                <p className="description">(Descrisão da publicação)</p>
                <img
                  className="post-image"
                  src={Image}
                  alt="Post"
                />
                <div className="divider" />

                <div className="stats-publi">
                  <div>
                    <strong>10</strong>
                    <span>Gostos</span>
                  </div>
                  <div>
                    <strong>10</strong>
                    <span>Comentários</span>
                  </div>
                </div>
                <p className="interaction">
                  Deixe um coração e uma resposta na sua publicação para mostrar
                  que se interessas!
                </p>
                <button className="card-button-publi">
                  Aceder ao separador Publicações
                </button>
              </div>

              {/* Ultimos Subscritores*/}

              <div className="card-subscribers">
                <h3>Subscritores recentes</h3>
                <p className="duration">Duração total</p>
                <button className="view-all">Ver tudo</button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ModalCriarVaga isOpen={open} onClose={() => Setopen(false)} />
      <ModalPublicar
        isOpen={isModalPubliOpen}
        onClose={() => setIsModalPubliOpen(false)}
      />
    </>
  );
}
