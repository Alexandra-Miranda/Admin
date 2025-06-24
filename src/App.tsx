// import "./App.css";
import InicioPage from "./Screens/inicio";
import Analise from "./Screens/ANALISE/analise";
import Vagas from "./Screens/VAGAS/vagas";
import Perfil from "./Screens/perfil";
import Cadastro from "./Screens/DadosEmpresa/cadastro";
import Login from "./Screens/DadosEmpresa/login";
import Category from "./Screens/categorias";
import Validar from "./Screens/validarEmpresa";
import Users from "./Screens/users";
import Vg from "./Screens/Vagas";
import Denu from "./Screens/denuncias";
import Comunicacao from "./Screens/comunicacao";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />}></Route>
        <Route path="/cadastro-empresa" element={<Cadastro />}></Route>
        <Route path="/dashboard" element={<InicioPage />}></Route>
        <Route path="/2" element={<Vagas />}></Route>
        <Route path="/3" element={<Analise />}></Route>
        <Route path="/4" element={<Perfil />}></Route>
        <Route path="/5" element={<Category/>}></Route>
        <Route path="/6" element={<Validar/>}></Route>
        <Route path="/7" element={<Users/>}></Route>
        <Route path="/8" element={<Vg/>}></Route>
        <Route path="/9" element={<Denu/>}></Route>
        <Route path="/10" element={<Comunicacao/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
