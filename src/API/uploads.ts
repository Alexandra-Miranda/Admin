import api from "./apiConfig";
import { AxiosResponse, AxiosError } from "axios";

type dataResponse = {
  folder: string;
  tags: string;
  context: string;
  timestamp: number;
  signature: string;
  cloud_name: string;
  api_key: string;
};

type uploadResponse = {
  message: string | null;
  error: string | null;
  data: dataResponse | null;
};

export async function ImageSignature(
): Promise<uploadResponse> {
  const data = await api
    .post("/uploads/image")
    .then((reply: AxiosResponse<uploadResponse>) => {
      return reply.data;
    })
    .catch((error: AxiosError<uploadResponse>) => {
      return (
        error.response?.data ??
        ({
          message: null,
          error: "Ocorreu um erro inesperado.",
          data: null,
        } as uploadResponse)
      );
    });

  return data;
}

export async function VideoSignature(
): Promise<uploadResponse> {
  const data = await api
    .post("/uploads/video")
    .then((reply: AxiosResponse<uploadResponse>) => {
      return reply.data;
    })
    .catch((error: AxiosError<uploadResponse>) => {
      return (
        error.response?.data ??
        ({
          message: null,
          error: "Ocorreu um erro inesperado.",
          data: null,
        } as uploadResponse)
      );
    });

  return data;
}
