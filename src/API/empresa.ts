import api from "./apiConfig";
import { AxiosError, AxiosResponse } from "axios";
import { actualizarVagaInput, criarPubliInput, criarVagaInput } from "../Validadores/empresaValidadores";
import { editarEmpresaInput } from "../Validadores/authValidadores";

type autoResposta = {
  mensagem: string | null;
  erro: string | null;
};

const fail: autoResposta = {
  erro: "Erro ao acessar servidor",
  mensagem: null,
};

type empresaResposta = {
  mensagem: string | null;
  erro: string | null;
  dados: {
    id: string;
    nome: string;
    slogan: string;
    descricao: string;
    setor: string;
    tipo: string;
    criadoEm: string;
    tamanho: string;
    especializacoes: string;
    morada: string;
    imagem: string;
    banner: string;
  } | null;
}; 

export async function criarVaga(dados: criarVagaInput): Promise<autoResposta> {
  const reply = await api
    .post("empresa/criar-vaga", dados)
    .then((reply: AxiosResponse<autoResposta>) => {
      console.log(reply.data);
      
      return reply.data;
    })
    .catch((error: AxiosError<autoResposta>) => {
      const errorResponse = error.response;
      console.log(errorResponse);
      
      return errorResponse ? errorResponse.data : fail;
    });

  return reply;
}

export async function criarPubli(dados: criarPubliInput): Promise<autoResposta> {
  const reply = await api
    .post("empresa/criar-publi", dados)
    .then((reply: AxiosResponse<autoResposta>) => {
      console.log(reply.data);
      
      return reply.data;
    })
    .catch((error: AxiosError<autoResposta>) => {
      const errorResponse = error.response;
      console.log(errorResponse);
      
      return errorResponse ? errorResponse.data : fail;
    });

  return reply;
}

export async function deletarVaga(id: string): Promise<autoResposta> {
  console.log(id)
  const reply = await api
    .delete(`empresa/deletar/vaga/${id}`)
    .then((reply: AxiosResponse<autoResposta>) => {
      console.log(reply.data);
      
      return reply.data;
    })
    .catch((error: AxiosError<autoResposta>) => {
      const errorResponse = error.response;
      console.log(errorResponse);
      
      return errorResponse ? errorResponse.data : fail;
    });

  return reply;
}

export async function actualizarVaga(dados: actualizarVagaInput): Promise<autoResposta> {
  const reply = await api
    .put(`empresa/actualizar/vaga`, {data: dados})
    .then((reply: AxiosResponse<autoResposta>) => {
      console.log(reply.data);
      
      return reply.data;
    })
    .catch((error: AxiosError<autoResposta>) => {
      const errorResponse = error.response;
      console.log(errorResponse);
      
      return errorResponse ? errorResponse.data : fail;
    });

  return reply;
}


export async function EditarEmpresa(
  dados: editarEmpresaInput
): Promise<empresaResposta> {
  const data = await api
    .put("empresa/editar", dados)
    .then((reply: AxiosResponse<empresaResposta>) => {
      return reply.data;
    })
    .catch((error: AxiosError<empresaResposta>) => {
      console.log(error.response?.data);
      return (
        error.response?.data ??
        {
          mensagem: null,
          erro: "Erro inesperado ao editar empresa.",
          dados: null,
        }
      );
    });

  return data;
}

export async function buscarEmpresasPendentes() {
  const resposta = await api.get("/admin/empresas/pendentes");
  return resposta.data;
}

export async function aprovarEmpresa(id: string) {
  await api.put(`/admin/empresas/aprovar/${id}`);
}