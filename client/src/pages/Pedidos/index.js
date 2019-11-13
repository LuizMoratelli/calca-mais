import React, { useState, useEffect } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Button from "../../styles/components/Button";
import api from "../../services/api";

import { Container, Pedido, ButtonIcon, SelectUsuario } from "./styles";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState();
  const [usuarios, setUsuarios] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [desconto, setDesconto] = useState();
  const [usuarioId, setUsuarioId] = useState();
  const [usuarioIdLista, setUsuarioIdLista] = useState();
  const [usuarioIdEdita, setUsuarioIdEdita] = useState();
  const [pedidoId, setPedidoId] = useState();
  const [novoDesconto, setNovoDesconto] = useState();

  useEffect(() => {
    getUsuarios();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if(usuarioId){
      await api.post(`pedidos`, {
        usuario_id: usuarioId,
        desconto: novoDesconto
      });
    }

    // não ta funcionando esta caralha
    toast.success("Pedido criado com sucesso!");

    setNovoDesconto("");
    handleBusca();
  }

  async function handleBusca() {
    if(usuarioIdLista){
      const response = await api.get(`pedidos?usuario_id=${usuarioIdLista}`);
  
      const { data } = response;
  
      if (data) setPedidos(data);


    }
  }

  function removePedido(pedidoId) {
    const pedidosFiltrados = pedidos.filter(
      pedido => pedido.id !== pedidoId
    );

    setPedidos(pedidosFiltrados);
  }

  async function handleDelete(pedidoId) {
    removePedido(pedidoId);

    toast.success("Pedido excluído com sucesso!");

    const aux = await api.delete(`pedidos/${pedidoId}`);
  }

  function handleEdit({ usuario_id, id, desconto }) {
    setPedidoId(id);
    setUsuarioIdEdita(usuario_id);
    setDesconto(desconto);
    setIsModalOpen(true);
  }
  async function getUsuarios() {
    const response = await api.get("usuarios");

    const { data } = response;

    setUsuarios(data);
  }

  async function handleSendEdit() {
    const aux = await api.patch(
      `pedidos/${pedidoId}`,
      {
        desconto: desconto,
        usuario_id: usuarioIdEdita
      }
    );

    toast.success("Pedido alterado com sucesso!");
    setIsModalOpen(!isModalOpen);
    handleBusca();
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
            value={novoDesconto}
            placeholder="desconto"
            onChange={e => setNovoDesconto(e.target.value)}
          />
          <SelectUsuario onChange={e => setUsuarioId(e.target.value)}>
            <option select value="1">
              Selecionar
            </option>
            {usuarios &&
              usuarios.map((usuario, key) => (
                <option key={key} value={usuario.id}>
                  {usuario.nome}
                </option>
              ))}
          </SelectUsuario>
          <Button size="big" onClick={e => handleSubmit(e)}>
            Salvar
          </Button>
        </form>
        <hr/>
        <SelectUsuario onChange={e => setUsuarioIdLista(e.target.value)}>
          <option select value="1">
            Selecionar
          </option>
          {usuarios &&
            usuarios.map((usuario, key) => (
              <option key={key} value={usuario.id}>
                {usuario.nome}
              </option>
            ))}
        </SelectUsuario>

        <Button size="big" onClick={e => handleBusca(e)}>
          Buscar
        </Button>
        <ul>
          {pedidos &&
            pedidos.map((pedido, key) => (
              <Pedido key={key}>
                <strong>{pedido.desconto}</strong>
                <strong>
                  <ButtonIcon>
                    <MdModeEdit size={20} onClick={() => handleEdit(pedido)} />
                  </ButtonIcon>
                  <ButtonIcon>
                    <MdDelete
                      size={20}
                      onClick={() =>
                        handleDelete(pedido.id)
                      }
                    />
                  </ButtonIcon>
                </strong>
              </Pedido>
            ))}
        </ul>
        {isModalOpen && (
          <Modal size="big">
            <h1>Edição Pedido</h1>
            <form>
              <span>Desconto</span>
              <input
                name="10,00"
                value={desconto}
                onChange={e => setDesconto(e.target.value)}
              />
              <span>Usuario</span>
              <SelectUsuario onChange={e => setUsuarioIdEdita(e.target.value)}>
                {usuarios &&
                  usuarios.map(usuario =>
                    usuario.id === usuarioId ? (
                      <option select key={usuario.id} value={usuario.id}>
                        {usuario.nome}
                      </option>
                    ) : (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.nome}
                      </option>
                    )
                  )}
              </SelectUsuario>
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
