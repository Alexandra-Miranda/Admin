// src/API/apagar.ts
import api from "./apiConfig";

export async function ApagarCategoria(id: string) {
  try {
    const response = await api.delete(`/buscar/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao apagar categoria:", error);
    throw error;
  }
}
