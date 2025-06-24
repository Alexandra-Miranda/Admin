import api from "./apiConfig";

export async function CriarCategoria({
  nome,
  cor,
  icon,
}: {
  nome: string;
  cor: string;
  icon: string;
}) {
  const response = await api.post("/criar/categorias", { nome, cor, icon });
  return response.data;
}
