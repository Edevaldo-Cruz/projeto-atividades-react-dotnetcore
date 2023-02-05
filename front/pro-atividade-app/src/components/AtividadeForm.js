import { useEffect, useState } from "react";

const atividadeInicial = {
  id: 0,
  titulo: "",
  prioridade: 0,
  descricao: "",
};

export default function AtividadeForm(props) {
  //para ação de editar
  const [atividade, setAtividade] = useState(atividadeAtual());

  useEffect(() => {
    if (props.ativSelecionada.id !== 0) setAtividade(props.ativSelecionada);
  }, [props.ativSelecionada]);

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setAtividade({ ...atividade, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.ativSelecionada.id !== 0) {
      props.atualizarAtividade(atividade); //Salva a edição da atividade
    } else {
      props.addAtividade(atividade); //Adiciona mais uma atividade
    }
    setAtividade(atividadeInicial);
  };

  const handleCancelar = (e) => {
    e.preventDefault();

    props.cancelarAtividade();
    setAtividade(atividadeInicial);
  };

  function atividadeAtual() {
    if (props.ativSelecionada.id !== 0) {
      return props.ativSelecionada;
    } else {
      return atividadeInicial;
    }
  }

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input
            id="titulo"
            name="titulo"
            value={atividade.titulo}
            type="text"
            className="form-control"
            onChange={inputTextHandler}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select
            id="prioridade"
            name="prioridade"
            value={atividade.prioridade}
            className="form-select"
            onChange={inputTextHandler}
          >
            <option value="Não definido">Selecione a prioridade</option>
            <option value="Baixo">Baixo</option>
            <option value="Normal">Normal</option>
            <option value="Alto">Alto</option>
          </select>
        </div>
        <div className="col-md-12">
          <label className="form-label">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={atividade.descricao}
            type="text"
            className="form-control"
            onChange={inputTextHandler}
          />
          <hr />
        </div>
        <div className="col-12 mt-0">
          {atividade.id === 0 ? (
            <button
              className="btn btn-outline-success"
              //chama a função addAtividade localizado no App
              //onClick={props.addAtividade} //refatorado
              type="submit"
            >
              <i className="fas fa-plus me-2"></i>
              Salvar
            </button>
          ) : (
            <>
              <button className="btn btn-outline-success me-2" type="submit">
                Salvar
              </button>
              <button
                className="btn btn-outline-warning"
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
}
