import { useState, useEffect } from "react";
import "./App.css";
import AtividadeForm from "./components/AtividadeForm";
import AtividadeLista from "./components/AtividadeLista";

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
  const [index, setIndex] = useState(0);
  const [atividades, setAtividades] = useState([]); //useState(initialState);
  const [atividade, setAtividade] = useState({ id: 0 });

  useEffect(() => {
    atividades.length <= 0
      ? setIndex(1)
      : setIndex(
          Math.max.apply(
            Math,
            atividades.map((item) => item.id)
          ) + 1
        );
  }, [atividades]);

  function addAtividade(ativ) {
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
    setAtividades([...atividades, { ...ativ, id: index }]);
  }

  function deletarAtividade(id) {
    const atividadesFiltradas = atividades.filter(
      (atividade) => atividade.id !== id
    );
    setAtividades([...atividadesFiltradas]);
  }

  function pegarAtividade(id) {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
  }

  function cancelarAtividade() {
    setAtividade({ id: 0 });
  }

  function atualizarAtividade(ativ) {
    setAtividades(
      atividades.map((item) => (item.id === ativ.id ? ativ : item))
    );
    setAtividade({ id: 0 });
  }

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
    </>
  );
}

export default App;
