import z from "zod";

export const criarEmpresa = z.object({
  nome: z.string().nonempty(),
  email: z.string().nonempty().email(),
  senha: z.string().nonempty(),
  telefone: z.string().nonempty(),
  nif: z.string().nonempty(),
  provincia: z.string().nonempty(),
  municipio: z.string().nonempty(),
  morada: z.string().nonempty(),
  tipo: z.string().nonempty(),
  setor: z.string().nonempty(),
  // fundado: z.string().nonempty(),
  tamanho: z.string().nonempty(),
  especializacoes: z.string().nonempty(),
  site: z.string().nonempty(),
});

export const logarEmpresa = z.object({
  email: z.string().nonempty().email(),
  senha: z.string().nonempty(),
});

export const editarEmpresa = z.object({
  id: z.string().uuid(),
  nome: z.string().optional(),
  slogan: z.string().optional(),
  descricao: z.string().optional(),
  setor: z.string().optional(),
  tipo: z.string().optional(),
  criadoEm: z.string().optional(),
  tamanho: z.string().optional(),
  especializacoes: z.string().optional(),
  morada: z.string().optional(),
  imagem: z.string().optional(),
  banner: z.string().optional(),
});

export type editarEmpresaInput = z.infer<typeof editarEmpresa>;
export type criarEmpresaInput = z.infer<typeof criarEmpresa>;
export type logarEmpresaInput = z.infer<typeof logarEmpresa>;
