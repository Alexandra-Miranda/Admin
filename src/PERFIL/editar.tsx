import React, { useState,  useEffect } from "react";
import "./editarStyle.css";
import { EditarEmpresa } from "../API/empresa"; 
import { editarEmpresaInput } from "../Validadores/authValidadores"; 
import api from "../API/apiConfig";
import { handleUploadImage } from "../uteis/cloudnary";
// import Imagem from "../image/ncr.png"
// import Bgimg from "../image/ncr banner.png"

export default function EditarEmpresaPage() {
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [slogan, setSlogan] = useState("");
  const [destaque, setDestaque] = useState("");
  const [setor, setSetor] = useState("");
  const [tipo, setTipo] = useState("");
  const [fundada, setFundada] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [especializacoes, setEspecializacoes] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [visaog, setVisaog] = useState("");
  const [logo, setLogo] = useState("");
  const [logoFile, setLogoFile] = useState<File | string>("")
  const [banner, setBanner] = useState("");
  const [bannerFile, setBannerFile] = useState<File | string>("")
  const [idEmpresa, setIdEmpresa] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  // 🔄 Buscar dados da empresa ao carregar
  useEffect(() => {
    async function buscarEmpresa() {
      try {
        const resposta = await api.get("/empresa/detalhes");
        const dados = resposta.data.dados;
        setIdEmpresa(dados.id);
        setNomeEmpresa(dados.nome);
        setSlogan(dados.slogan);
        setDestaque(dados.descricao);
        setSetor(dados.setor);
        setTipo(dados.tipo);
        setFundada(dados.criadoEm);
        setTamanho(dados.tamanho);
        setEspecializacoes(dados.especializacoes);
        setLocalizacao(dados.morada);
        setLogo(dados.imagem);
        setBanner(dados.banner);
        setVisaog(dados.descricao); // ou outro campo se for separado
      } catch (error) {
        setMensagem("Erro ao buscar dados da empresa.");
      }
    }

    buscarEmpresa();
  }, []);

  // 🧠 Converte imagem base64 (simples) para upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (type === 'logo') {
            setLogo(reader.result);
            setLogoFile(file);
          }
          else {
            setBanner(reader.result);
            setBannerFile(file);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 💾 Enviar alterações
  async function handleSubmit() {
    setCarregando(true);
    let bannerImage: string | undefined = undefined;
    let logoImage: string | undefined = undefined;

    if (bannerFile) {
      bannerImage = await handleUploadImage({file: bannerFile});
    }
    if (logoFile) {
      logoImage = await handleUploadImage({file: logoFile})
    }

    const dados: editarEmpresaInput = {
      id: idEmpresa,
      nome: nomeEmpresa,
      slogan,
      descricao: visaog,
      setor,
      tipo,
      criadoEm: fundada,
      tamanho,
      especializacoes,
      morada: localizacao,
      imagem: logoImage,
      banner: bannerImage,
    };

    console.log(dados);
    

    const resposta = await EditarEmpresa(dados);
    if (resposta.erro) {
      setMensagem("Erro ao salvar: " + resposta.erro);
    } else {
      setMensagem("Alterações salvas com sucesso!");
    }

    setCarregando(false);
  }

  return (
    <div className="editar-container">
      <h2>Editar Perfil da Empresa</h2>

      {mensagem && <p>{mensagem}</p>}

      <div className="editar-section">
        <label>Foto de Fundo</label>
        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'banner')} />
        {banner && <img src={banner} alt="Banner" className="editar-banner-preview" />}
      </div>

      <div className="editar-section">
        <label>Foto de Perfil</label>
        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'logo')} />
        {logo && <img src={logo} alt="Logo" className="editar-logo-preview" />}
      </div>

      <div className="editar-section">
        <label>Nome da Empresa</label>
        <input type="text" value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)} />
      </div>

      <div className="editar-section">
        <label>Slogan</label>
        <input type="text" value={slogan} onChange={(e) => setSlogan(e.target.value)} />
      </div>

      <div className="editar-section">
        <label>Destaque</label>
        <input type="text" value={destaque} onChange={(e) => setDestaque(e.target.value)} />
      </div>

      <div className="editar-section">
        <label>Setor</label>
        <input type="text" value={setor} onChange={(e) => setSetor(e.target.value)} />
      </div>

      <div className="editar-section">
        <label>Tipo</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Selecione o tipo de empresa</option>
          <option value="Pública">Pública</option>
          <option value="Privada">Privada</option>
          <option value="Mistas">Mista</option>
          <option value="Cooperativa">Cooperativa</option>
          <option value="ONGs">Organizações Sem Fins Lucrativos</option>
          <option value="Startups">Startups</option>
          <option value="Multinacionais">Multinacionais</option>
          <option value="(S.A.)"> Sociedades anônimas (S.A.)</option>
        </select>
      </div>

      <div className="editar-section">
        <label>Fundada em:</label>
        <input type="text" value={fundada} onChange={(e) => setFundada(e.target.value)} />
      </div>

      <div className="editar-section">
        <label>Tamanho da empresa</label>
        <input type="text" value={tamanho} onChange={(e) => setTamanho(e.target.value)} />
      </div>

      <div className="editar-section">
        <label>Especializações</label>
        <input type="text" value={especializacoes} onChange={(e) => setEspecializacoes(e.target.value)} />
      </div>

      <div className="editar-section">
        <label>Localização</label>
        <input type="text" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} />
      </div>

      <div className="editar-section">
        <label>Visão geral</label>
        <textarea value={visaog} onChange={(e) => setVisaog(e.target.value)} />
      </div>

      <button
        className="editar-save-button"
        onClick={handleSubmit}
        disabled={carregando}
      >
        {carregando ? "Salvando..." : "Salvar Alterações"}
      </button>
    </div>
  );
}