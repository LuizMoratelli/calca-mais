import React, { useState, useEffect } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Button from "../../styles/components/Button";
import api from "../../services/api";

import { Container, Calcado, ButtonIcon } from "./styles";

export default function Calcados() {
  const [calcados, setCalcados] = useState();
  const [categorias, setCategorias] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calcado, setCalcado] = useState();
  const [preco, setPreco] = useState();
  const [categoriaId, setCategoriaId] = useState();
  const [categoriaIdLista, setCategoriaIdLista] = useState();
  const [calcadoId, setCalcadoId] = useState();
  const [novoCalcado, setNovoCalcado] = useState();
  const [novoPreco, setNovoPreco] = useState();

  useEffect(() => {
    getCategorias();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    debugger;
    await api.post(`categorias/${categoriaId}/calcados`, {
      nome: novoCalcado,
      preco: novoPreco
    });

    toast.success("Calcado criado com sucesso!");
    // getCalcados
    setNovoCalcado("");
    setNovoPreco("");
  }

  async function handleBusca(){
    debugger;
    const response = await api.get(`categorias/${categoriaIdLista}/calcados`);

    const { data } = response;

    if (data) setCalcados(data);
  }

  function removeCalcado(calcadoId, categoriaId) {
    const calcadosFiltrados = calcados.filter(
      calcado => calcado.id !== calcadoId
    );

    setCalcados(calcadosFiltrados);
  }

  async function handleDelete(calcadoId, categoriaId) {
    removeCalcado(calcadoId, categoriaId);

    toast.success("Calcado excluído com sucesso!");

    await api.delete(`categorias/${categoriaId}/calcados/${calcadoId}`);
  }

  function handleEdit({ categoria_id, nome, id, preco }) {
    setCalcado(nome);
    setCalcadoId(id);
    setCategoriaId(categoria_id);
    setPreco(preco);
    setIsModalOpen(true);
  }
  async function getCategorias() {
    const response = await api.get('categorias');

    const { data } = response;

    setCategorias(data);

  }

  async function handleSendEdit() {
    const aux = await api.patch(
      `categorias/${categoriaId}/calcados/${calcadoId}`,
      {
        nome: calcado,
        preco: preco
      }
    );

    toast.success("Calcado alterado com sucesso!");
    setIsModalOpen(!isModalOpen);
    // getCalcados();
  }

  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <Header />
      <Container>
        <form>
          <input
            value={novoCalcado}
            placeholder="Calcado"
            onChange={e => setNovoCalcado(e.target.value)}
          />

          <input
            value={novoPreco}
            placeholder="10,00"
            onChange={e => setNovoPreco(e.target.value)}
          />
          <select onChange={e => setCategoriaId(e.target.value)}>
            {categorias &&
              categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
          </select>
          <Button size="big" onClick={e => handleSubmit(e)}>
            Salvar
          </Button>
        </form>

        <select onChange={e => setCategoriaIdLista(e.target.value)}>
          {categorias &&
            categorias.map((categoria, key) => (
              <option key={key} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
        </select>

        <Button size="big" onClick={e => handleBusca(e)}>
            Buscar
        </Button>
        <ul>
          {calcados &&
            calcados.map((calcado, key) => (
              <Calcado key={key}>
                <strong>{calcado.nome}</strong>
                <strong>{calcado.preco}</strong>
                <strong>
                  <ButtonIcon>
                    <MdModeEdit size={20} onClick={() => handleEdit(calcado)} />
                  </ButtonIcon>
                  <ButtonIcon>
                    <MdDelete
                      size={20}
                      onClick={() =>
                        handleDelete(calcado.id, calcado.categoria_id)
                      }
                    />
                  </ButtonIcon>
                </strong>
              </Calcado>
            ))}
        </ul>
        {isModalOpen && (
          <Modal size="big">
            <h1>Edição Calcado</h1>
            <form>
              <span>Nome</span>
              <input
                name="Calçado"
                value={calcado}
                onChange={e => setCalcado(e.target.value)}
              />
              <span>Preço</span>
              <input
                name="10,00"
                value={preco}
                onChange={e => setPreco(e.target.value)}
              />
              <Button onClick={handleSendEdit} size="big" type="submit">
                Salvar
              </Button>
              <Button onClick={handleModal} size="small" color="gray">
                Cancelar
              </Button>
            </form>
          </Modal>
        )}
      </Container>
    </>
  );
}
