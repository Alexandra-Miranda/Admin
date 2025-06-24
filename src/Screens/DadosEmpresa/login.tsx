import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./loginStyle.css";
import { LogarEmpresa } from "../../API/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { erro } = await LogarEmpresa(form);

    if (erro) {
      alert(erro);
    } else {
      navigate("/dashboard");
    }
    console.log("User logged in:", form);
  };

  return (
    <motion.div
      className="login-wrapper"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

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
            type="password"
            placeholder="Senha"
            value={form.senha}
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
          Entrar
        </motion.button>

        <div className="social-login">
          <button className="google-btn">
            <FaGoogle /> Entrar com Google
          </button>
          <button className="facebook-btn">
            <FaFacebook /> Entrar com Facebook
          </button>
        </div>

        <div className="register-link">
          <p>
            Não tem uma conta?{" "}
            <Link to="/cadastro-empresa">Cadastre-se aqui</Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;
