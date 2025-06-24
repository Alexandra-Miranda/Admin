import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaLandmark,
  FaRulerCombined,
  FaTools,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./cadastroStyle.css";
import { CriarEmpresa } from "../../API/auth";
import { Buscar } from "../../API/buscar";

type Options = {
  value: string;
  text: string;
};

const EmpresaForm = () => {
  const navigate = useNavigate();
  const [provincias, setProvincias] = useState<Options[]>([
    {
      text: "",
      value: "",
    },
  ]);
  const [municipios, setMunicipios] = useState<Options[]>([
    {
      text: "",
      value: "",
    },
  ]);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    telefone: "",
    setor: "",
    tamanho: "",
    especializacoes: "",
    site: "",
    nif: "",
    provincia: "",
    municipio: "",
    morada: "",
    tipo: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "telefone" && isNaN(Number(value))) return; // Impede letras no campo de telefone
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    console.log(form);

    const { erro } = await CriarEmpresa(form);

    if (erro) {
      alert(erro);
    } else {
      navigate("/dashboard");
    }

    // console.log("Empresa cadastrada:", form);
  };

  useEffect(() => {
    (async () => {
      const { data } = await Buscar<string[]>({ url: "/provincias" });
      const provinces = data?.map((p) => ({ value: p, text: p }));
      setProvincias(provinces ? provinces : []);
      console.log("Provincias carregadas:", provinces);
    })();
  }, []);

  useEffect(() => {
    if (!form.provincia) return;

    handleChange({
      target: {
        name: "municipio",
        value: "",
      },
    } as React.ChangeEvent<HTMLSelectElement>);

    (async () => {
      const { data } = await Buscar<string[]>({
        url: `/${form.provincia}/municipios`,
      });
      const municipalities = data?.map((m) => ({ value: m, text: m }));
      setMunicipios(municipalities ? municipalities : []);
    })();
  }, [form.provincia]);

  return (
    <motion.div
      className="form-wrapper"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form className="empresa-form" onSubmit={handleSubmit}>
        <h2>Cadastro de Empresa</h2>

        <div className="input-group">
          <FaBuilding className="icon-signin" />
          <input
            name="nome"
            type="text"
            placeholder="Nome da Empresa"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="icon-signin" />
          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="icon-signin" />
          <input
            name="senha"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
          <span
            className="toggle-visibility"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="input-group">
          <FaLock className="icon-signin" />
          <input
            name="confirmarSenha"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar Senha"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
          />
          <span
            className="toggle-visibility"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="input-group">
          <FaPhone className="icon-signin" />
          <input
            name="telefone"
            type="text"
            placeholder="Telefone"
            value={form.telefone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaUserShield className="icon-signin" />

          <select name="tipo" className="input" value={form.tipo} onChange={handleChange}>
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

        <div className="input-group">
          <FaLandmark className="icon-signin" />
          <input
            name="setor"
            type="text"
            placeholder="Setor"
            value={form.setor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaRulerCombined className="icon-signin" />
          <input
            name="tamanho"
            type="text"
            placeholder="Tamanho"
            value={form.tamanho}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaTools className="icon-signin" />
          <input
            name="especializacoes"
            type="text"
            placeholder="Especializações"
            value={form.especializacoes}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaPhone className="icon-signin" />
          <input
            name="site"
            type="text"
            placeholder="Site"
            value={form.site}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaIdCard className="icon-signin" />
          <input
            name="nif"
            type="text"
            placeholder="NIF / Registro"
            value={form.nif}
            onChange={handleChange}
            required
          />
        </div>

        <div className="select-group">
          <div className="select-wrapper">
            <select
              name="provincia"
              value={form.provincia}
              required
              onChange={handleChange}
            >
              <option value="">Província</option>
              {provincias.map((p, i) => (
                <option key={i} value={p.value}>
                  {p.text}
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <select
              name="municipio"
              value={form.municipio}
              required
              disabled={form.provincia ? false : true}
              onChange={handleChange}
            >
              <option value="">Municipio</option>
              {municipios.map((m, i) => (
                <option key={i} value={m.value}>
                  {m.text}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="input-group">
          <FaMapMarkerAlt className="icon-signin" />
          <input
            name="morada"
            type="text"
            placeholder="Localização"
            value={form.morada}
            onChange={handleChange}
            required
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="submit-btn"
        >
          Cadastre-se
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EmpresaForm;
