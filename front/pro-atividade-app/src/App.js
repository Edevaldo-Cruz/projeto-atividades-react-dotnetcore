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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const pegaTodasAtividades = async () => {
    const response = await api.get("atividade");
    return response.data;
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
    console.log(response.status);
  };

  const deletarAtividade = async (id) => {
    if (await api.delete(`atividade/${id}`)) {
      const atividadesFiltradas = atividades.filter(
        (atividade) => atividade.id !== id
      );
      setAtividades([...atividadesFiltradas]);
    }
  };

  function pegarAtividade(id) {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
  }

  function cancelarAtividade() {
    setAtividade({ id: 0 });
  }

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data;
    setAtividades(
      atividades.map((item) => (item.id === id ? response.data : item))
    );
    setAtividade({ id: 0 });
  };

  return (
    <>
      <AtividadeForm
        addAtividade={addAtividade} //Chama a função
        atividades={atividades} // Obtem o array com as informações
        ativSelecionada={atividade} // atividade selecionada para editar
        atualizarAtividade={atualizarAtividade} // função para salvar edição da atividade
        cancelarAtividade={cancelarAtividade}
      />
      <AtividadeLista
        atividades={atividades}
        deletarAtividade={deletarAtividade}
        pegarAtividade={pegarAtividade}
      />

      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
