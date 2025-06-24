import { useEffect, useState } from "react";
import { Buscar } from "../API/buscar"; // ajusta o caminho se necessário

interface Empresa {
  id: string;
  nome: string;
  imagem?: string;
}

export function useBuscarEmpresas() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      const resposta = await Buscar<Empresa[]>({
        url: "/admin/empresas/todas", // ajusta a rota de acordo com tua API
      });

      if (resposta.error) {
        setErro("Erro ao buscar empresas.");
        setEmpresas([]);
      } else {
        setEmpresas(resposta.data || []);
      }

      setCarregando(false);
    }

    carregar();
  }, []);

  return { empresas, carregando, erro };
}
