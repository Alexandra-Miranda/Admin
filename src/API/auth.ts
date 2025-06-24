import api from "./apiConfig";
import { AxiosError, AxiosResponse } from "axios";
import {
  criarEmpresaInput,
  logarEmpresaInput,
  editarEmpresaInput
} from "../Validadores/authValidadores";

type autoResposta = {
  mensagem: string | null;
  erro: string | null;
  token: string | null;
};


export async function CriarEmpresa(
  userData: criarEmpresaInput
): Promise<autoResposta> {
  const data = await api
    .post("/auth/signin/empresa", userData)
    .then((reply: AxiosResponse<autoResposta>) => {
      return reply.data;
    })
    .catch((error: AxiosError<autoResposta>) => {
      console.log(error.response?.data);
      return (
        error.response?.data ??
        ({
          mensagem: null,
          erro: "Correu um erro inesperado.",
          token: null,
        } as autoResposta)
      );
    });
  return data;
}

export async function LogarEmpresa(
  userData: logarEmpresaInput
): Promise<autoResposta> {
  const data = await api
    .post("/auth/login/empresa", userData)
    .then((reply: AxiosResponse<autoResposta>) => {
      return reply.data;
    })
    .catch((error: AxiosError<autoResposta>) => {
      
      console.log(error.response?.data);
      return (
        error.response?.data ??
        ({
          mensagem: null,
          erro: "Correu um erro inesperado.",
          token: null,
        } as autoResposta)
      );
    });
  return data;
}
