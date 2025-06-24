import z from "zod";

const modalidades = z.enum(["REMOTO", "HIBRIDO", "PRESENCIAL", ""]);
export type Modalidades = z.infer<typeof modalidades>;
export const criarVaga = z.object({
  titulo: z.string().nonempty(),
  categoriaId: z.string().nonempty(),
  descricao: z.string().nonempty(),
  responsabilidades: z.string().array(),
  remuneracao: z.boolean(),
  beneficios: z.string().array(),
  habilidades: z.string().array(),
  numeroVagas: z.number().int().nonnegative(),
  modalidade: modalidades,
});

export const actualizarVaga = z.object({
  id: z.string().uuid(),
  titulo: z.string().nonempty(),
  categoriaId: z.string().nonempty(),
  descricao: z.string().nonempty(),
  responsabilidades: z.string().array(),
  remuneracao: z.boolean(),
  beneficios: z.string().array(),
  habilidades: z.string().array(),
  numeroVagas: z.number().int().nonnegative(),
  modalidade: z.enum(["REMOTO", "HIBRIDO", "PRESENCIAL"]),
  // empresaId: z.string().nonempty().uuid(),
});

export const criarPubli = z.object({
  titulo: z.string().nonempty(),
  conteudo: z.string().nonempty(),
  urlsMidia: z.string().array(),
  // empresaId: z.string().nonempty().uuid(),
});

export type criarPubliInput = z.infer<typeof criarPubli>;
export type criarVagaInput = z.infer<typeof criarVaga>;
export type actualizarVagaInput = z.infer<typeof actualizarVaga>;

