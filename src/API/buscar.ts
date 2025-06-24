import { AxiosResponse, AxiosError, GenericAbortSignal } from "axios";
import api from "./apiConfig"; // Aqui deve estar o axios.create({ baseURL: 'http://localhost:3333' })

interface Props {
  url: string;
  signal?: GenericAbortSignal | undefined;
}

interface Response<T> {
  error: string | null;
  data: T | null;
}

const fail = {
  error: "Erro ao acessar o servidor.",
  data: null,
};

// Função genérica para GET
export async function Buscar<T>({ url, signal }: Props): Promise<Response<T>> {
  try {
    const reply: AxiosResponse<Response<T>> = await api.get(`/buscar${url}`, { signal });
    return reply.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<Response<T>>;
    const errorResponse = axiosError.response;
    return errorResponse ? errorResponse.data! : fail;
  }
}

// Buscar vagas com filtros
export async function fetchVagasAdmin(filtros: Record<string, string> = {}) {
  try {
    const queryParams = new URLSearchParams(filtros).toString();
    const { data } = await Buscar<any[]>({ url: `/admin/vagas?${queryParams}` });
    return data || [];
  } catch (error) {
    console.error("Erro ao buscar vagas:", error);
    return [];
  }
}

// Atualizar status da vaga
export async function atualizarStatusVaga(id: string, status: "APROVADA" | "RECUSADA" | "ARQUIVADA") {
  try {
    await api.put(`/admin/vagas/${id}/status`, { status });
    return true;
  } catch (error) {
    console.error("Erro ao atualizar status da vaga:", error);
    return false;
  }
}
