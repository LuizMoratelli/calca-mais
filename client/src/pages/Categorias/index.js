import React, { useState, useEffect } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Button from "../../styles/components/Button";
import api  from "../../services/api";

import { Container, Categoria, ButtonIcon } from "./styles";

export default function Categorias() {
  const [categorias, setCategorias] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoria, setCategoria] = useState();
  const [id, setId] = useState();
  const [novaCategoria, setNovaCategoria] = useState();

  async function getCategorias() {
    const response = await api.get('categorias');

    const { data } = response;

    if (data) setCategorias(data);
  }

  useEffect(() => {getCategorias()} , []);

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post('categorias', {
      nome: novaCategoria,
    });

    toast.success("Categoria criada com sucesso!");
    getCategorias();
    setNovaCategoria('');
  }

  function removeCategoria(id) {
    const categoriasFiltradas = categorias.filter(categoria => categoria.id !== id);

    setCategorias(categoriasFiltradas);
  }

  async function handleDelete(id) {
    removeCategoria(id);
    toast.success("Categoria excluída com sucesso!");
    await api.delete(`categorias/${id}`);
  }

  function handleEdit({ id, nome }) {
    setCategoria(nome);
    setId(id);
    setIsModalOpen(true);
  }

  async function handleSendEdit(){
    const aux = await api.patch(`categorias/${id}`, {
      nome: categoria,
    });

    toast.success("Categoria alterada com sucesso!");
    setIsModalOpen(!isModalOpen);
    getCategorias();
  }

  function handleModal(){
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <Header />
      <Container>
        <form>
          <input
            value={novaCategoria}
            placeholder="Categoria"
            onChange={e => setNovaCategoria(e.target.value)}
          />
          <Button size="big" onClick={e => handleSubmit(e) }>Salvar</Button>
        </form>
        <ul>
          {categorias && 
            categorias.map((categoria, key) => (
              <Categoria key={key}>
                <strong>{categoria.nome}</strong>
                <strong>
                  <ButtonIcon>
                    <MdModeEdit size={20} onClick={() => handleEdit(categoria)} />
                  </ButtonIcon>
                  <ButtonIcon>
                    <MdDelete size={20} onClick={() => handleDelete(categoria.id)} />
                  </ButtonIcon>
                </strong>
              </Categoria>
            )) }
        </ul>
          {isModalOpen && ( 
            <Modal size="big">
              <h1>Edição Categoria</h1>
              <form>
                <span>Nome</span>
                <input
                  name="Categoria"
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
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