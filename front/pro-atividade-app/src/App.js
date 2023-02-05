import { useState, useEffect } from "react";
import "./App.css";
import AtividadeForm from "./components/AtividadeForm";
import AtividadeLista from "./components/AtividadeLista";
import api from "./api/atividade";
import { Button, Modal } from "react-bootstrap";

// let initialState = [
//   {
//     id: 1,
//     prioridade: "1",
//     titulo: "Atividade 1",
//     descricao: "Primeira Atividade",
//   },
//   {
//     id: 2,
//     prioridade: "2",
//     titulo: "Atividade 2",
//     descricao: "Segunda Atividade",
//   },
// ];

function App() {
  const [index] = useState(0);
  const [atividades, setAtividades] = useState([]); //useState(initialState);
  const [atividade, setAtividade] = useState({ id: 0 });

  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);

  const handleAtividadeModal = () => {
    setShowAtividadeModal(!showAtividadeModal);
  };

  const handleConfirmModal = (id) => {
    if (id !== 0 && id !== undefined) {
      const atividade = atividades.filter((atividade) => atividade.id === id);
      setAtividade(atividade[0]);
    } else {
      setAtividade({ id: 0 });
    }
    setSmShowConfirmModal(!smShowConfirmModal);
  };

  const pegaTodasAtividades = async () => {
    const response = await api.get("atividade");
    return response.data;
  };

  const novaAtividade = () => {
    setAtividade({ id: 0 });
    handleAtividadeModal();
  };

  useEffect(() => {
    // atividades.length <= 0 REFATORADO PARA USAR API
    //   ? setIndex(1)
    //   : setIndex(
    //       Math.max.apply(
    //         Math,
    //         atividades.map((item) => item.id)
    //       ) + 1
    //     );

    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();
      if (todasAtividades) setAtividades(todasAtividades);
    };
    getAtividades();
  }, []);

  const addAtividade = async (ativ) => {
    //(e) refatorado {
    //e.preventDefault(); //retira o comportamento padrão, nesse caso a ação de submit //refatorado

    // const atividade = { REFATORADO
    //   // id: document.getElementById("id").value, refatorado
    //   //pega o maior id das atividades e atribui mais 1. refatorado
    //   id:
    //     Math.max.apply(
    //       Math,
    //       atividades.map((item) => item.id)
    //     ) + 1,
    //   prioridade: document.getElementById("prioridade").value,
    //   titulo: document.getElementById("titulo").value,
    //   descricao: document.getElementById("descricao").value,
    // };
    // atividades.push(atividade); refatorado

    //cria um novo array coloca todos os objetos ja existente nele e adiciona os novos

    // setAtividades([...atividades, { ...ativ, id: index }]); refatorado

    const response = await api.post("atividade", ativ);
    setAtividades([...atividades, response.data]);
    handleAtividadeModal();
  };

  const deletarAtividade = async (id) => {
    handleConfirmModal(0);
    if (await api.delete(`atividade/${id}`)) {
      const atividadesFiltradas = atividades.filter(
        (atividade) => atividade.id !== id
      );
      setAtividades([...atividadesFiltradas]);
    }
  };

  const pegarAtividade = (id) => {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
    handleAtividadeModal();
  };

  const cancelarAtividade = () => {
    setAtividade({ id: 0 });
    handleAtividadeModal();
  };

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data;
    setAtividades(
      atividades.map((item) => (item.id === id ? response.data : item))
    );
    setAtividade({ id: 0 });
    handleAtividadeModal();
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
        <h1 className="m-0 p-0">
          Atividade {atividade.id !== 0 ? atividade.id : " "}
        </h1>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <i className="fas fa-plus"></i>
        </Button>
      </div>

      <AtividadeLista
        atividades={atividades}
        pegarAtividade={pegarAtividade}
        handleConfirmModal={handleConfirmModal}
      />

      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Atividade {atividade.id !== 0 ? atividade.id : " "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            addAtividade={addAtividade} //Chama a função
            atividades={atividades} // Obtem o array com as informações
            ativSelecionada={atividade} // atividade selecionada para editar
            atualizarAtividade={atualizarAtividade} // função para salvar edição da atividade
            cancelarAtividade={cancelarAtividade}
          />
        </Modal.Body>
      </Modal>

      <Modal size="sm" show={smShowConfirmModal} onHide={handleConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Ecluindo Atividade {atividade.id !== 0 ? atividade.id : " "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja exluir a atividade {atividade.id}?
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-outline-success me-2"
            onClick={() => deletarAtividade(atividade.id)}
          >
            <i className="fas fa-check me-2"></i>
            Sim
          </button>
          <button
            className="btn btn-danger me-2"
            onClick={() => handleConfirmModal(0)}
          >
            <i className="fas fa-times me-2"></i>
            Não
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
