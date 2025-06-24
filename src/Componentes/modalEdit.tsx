import React, { FormEvent, useState } from "react";
import "./modalStyle.css";
import { criarVaga } from "../API/empresa";
import { Modalidades } from "../Validadores/empresaValidadores";
import { Buscar } from "../API/buscar";

type Resposta = {
    id: string;
    titulo: string;
    modalidade: string;
    descricao: string;
    beneficios: string[];
    responsabilidades: string[];
    habilidades: string[];
    remuneracao: boolean;
    criadoEm: string;
    atualizadoEm: Date;
    categoriaId: string;
    empresa: {
      criadoEm: Date;
      imagem: any;
      nome: string;
      morada: string;
    };
    numeroVagas: number;
  };

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Resposta;
}

type Categorias = {
  id: string;
  nome: string;
};

type FormData = {
  titulo: string;
  categoriaId: string;
  descricao: string;
  numeroVagas: string;
  modalidade: Modalidades;
};

interface Props {
  label: string;
  placeholder: string;
  list: string[];
  setter: React.Dispatch<React.SetStateAction<string[]>>;
  addField: (setter: React.Dispatch<React.SetStateAction<string[]>>) => void;
  removeField: (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
  updateField: (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
}

function Inputlist({
  label,
  list,
  setter,
  addField,
  removeField,
  updateField,
  placeholder,
}: Props) {
  return (
    <div className="field-list">
      <label>
        {label}{" "}
        <button
          type="button"
          className="add-btn"
          onClick={() => addField(setter)}
        >
          [+]
        </button>
      </label>
      <div className="list">
        {list.map((res, i) => (
          <div key={i} className="input-group">
            <input
              className="input"
              placeholder={placeholder}
              style={{ marginBottom: "0.5rem" }}
              value={res}
              onChange={(e) => updateField(i, e.target.value, setter)}
            />
            {i > 0 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeField(i, setter)}
              >
                [-]
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const ModalEditVaga: React.FC<ModalProps> = ({ data, isOpen, onClose }) => {
  const [temp, setTemp] = useState<Resposta>(data);
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  const [responsabilidades, setResponsabilidades] = useState<string[]>(temp.responsabilidades);
  const [habilidades, setHabilidades] = useState<string[]>(temp.habilidades);
  const [beneficios, setBeneficios] = useState<string[]>(temp.beneficios);
  const [remuneracao, setRemunracao] = useState<boolean>(temp.remuneracao);
  const [form, setForm] = useState<FormData>({
    titulo: temp.titulo,
    categoriaId: temp.categoriaId,
    descricao: temp.descricao,
    numeroVagas: temp.numeroVagas.toString(),
    modalidade: temp.modalidade as Modalidades,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const removeField = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const updateField = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleCheck = (e: React.MouseEvent<HTMLInputElement>) => {
    setRemunracao(e.currentTarget.checked);
  };

  async function SubmeterDados(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(form);

    const { erro } = await criarVaga({
      ...form,
      numeroVagas: parseInt(form.numeroVagas),
      remuneracao: remuneracao,
      beneficios: beneficios,
      habilidades: habilidades,
      responsabilidades: responsabilidades,
    });

    // console.log(erro, mensagem);
    if (erro) {
      alert(erro);
    } else {
      alert("Vaga criada com sucesso!");
      onClose();
    }
  }

  React.useEffect(() => {
    (async () => {
      const { data } = await Buscar<Categorias[]>({ url: "/categorias" });
      const categorias = data?.map((cat) => {
        return {
          id: cat.id,
          nome: cat.nome,
        };
      });
      setCategorias(categorias ?? []);
    })();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" >
      <div className="modal-content">
        <h2>Criar Nova Vaga</h2>
        <form
          className="form-container"
          onSubmit={SubmeterDados}
          id="modal-form"
        >
          <div className="form-column">
            <input
              className="input"
              placeholder="Nome da Vaga"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
            />
            <select
              className="input"
              name="categoriaId"
              onChange={handleChange}
              value={form.categoriaId}
            >
              <option value="">Selecione a Categoria</option>
              {categorias.map((cat) => (
                <option value={cat.id}>{cat.nome}</option>
              ))}
              {/* <option value="TI">TI</option>
              <option value="Administração">Administração</option>
              <option value="Engenharia">Engenharia</option> */}
            </select>

            <select
              className="input"
              name="modalidade"
              onChange={handleChange}
              value={form.modalidade}
            >
              <option value="">Modalidade</option>
              <option value="PRESENCIAL">Presencial</option>
              <option value="REMOTO">Remoto</option>
              <option value="HIBRIDO">Híbrido</option>
            </select>

            <textarea
              className="input textarea"
              placeholder="Descrição da vaga"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
            />

            <div>
              <input
                className="input"
                type="number"
                name="numeroVagas"
                value={form.numeroVagas}
                onChange={handleChange}
                min={1}
                max={200}
              />
            </div>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={remuneracao}
                onClick={handleCheck}
              />
              <label>Remunerado?</label>
            </div>
          </div>

          <div className="form-column">
            <Inputlist
              label="Responsabilidades"
              placeholder="Responsabilidade"
              list={responsabilidades}
              addField={addField}
              removeField={removeField}
              updateField={updateField}
              setter={setResponsabilidades}
            />

            <Inputlist
              label="Perfis Pretendidos"
              placeholder="Perfis Pretendidos"
              list={habilidades}
              addField={addField}
              removeField={removeField}
              updateField={updateField}
              setter={setHabilidades}
            />
            <Inputlist
              label="Valores"
              placeholder="Valores"
              list={beneficios}
              addField={addField}
              removeField={removeField}
              updateField={updateField}
              setter={setBeneficios}
            />
          </div>
        </form>

        <div className="modal-actions">
          <button className="btn cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn salvar" form="modal-form">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditVaga;
