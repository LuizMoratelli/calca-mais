import React, { useState, useEffect } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Button from "../../styles/components/Button";
import api from "../../services/api";

import { Container, PedidoCalcado, ButtonIcon, Select } from "./styles";

export default function PedidosCalcados() {
  const [pedidos, setPedidos] = useState();
  const [calcados, setCalcados] = useState();
  const [quantidade, setQuantidade] = useState();
  const [pedidoIdLista, setPedidoIdLista] = useState();
  const [pedidoId, setPedidoId] = useState();

  // useEffect(() => {
  //   getPedidos();
  // }, []);

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   if(pedidoId){
  //     await api.post(`pedidos/${pedidoId}`, {
  //       calcados: [calcados],
  //     });
  //   }

  //   // não ta funcionando esta caralha
  //   toast.success("Pedido Calçado criado com sucesso!");

  //   setQuantidade("");
  //   handleBusca();
  // }

  // async function handleBusca() {
  
  //   if(pedidoIdLista){
  //     const response = await api.get(`pedidos/${pedidoIdLista}/calcados`);
  
  //     const { data } = response;
  
  //     if (data) setPedidos(data);
  //   }
  // }

  // function removePedidoCalcado(pedidoId) {
  //   const pedidosFiltrados = pedidos.filter(
  //     pedido => pedido.id !== pedidoId
  //   );

  //   setPedidos(pedidosFiltrados);
  // }

  // async function handleDelete(pedidoId) {
  //   removePedidoCalcado(pedidoId);

  //   toast.success("Pedido Calçado excluído com sucesso!");

  //   const aux = await api.delete(`pedidos/${pedidoId}/calcados/${calcadoId}`, {
  //     "calcados-id": [calcadoId],
  //   });
  // }

  // function handleEdit({ usuario_id, id, desconto }) {
  //   setPedidoId(id);
  //   setUsuarioIdEdita(usuario_id);
  //   setDesconto(desconto);
  //   setIsModalOpen(true);
  // }
  // async function getPedidos() {
  //   const response = await api.get("pedidos");

  //   const { data } = response;

  //   setPedidos(data);
  // }

  // async function handleSendEdit() {
  //   const aux = await api.patch(
  //     `pedidos/${pedidoId}`,
  //     {
  //       desconto: desconto,
  //       usuario_id: usuarioIdEdita
  //     }
  //   );

  //   toast.success("Pedido alterado com sucesso!");
  //   setIsModalOpen(!isModalOpen);
  //   handleBusca();
  // }

  // function handleModal() {
  //   setIsModalOpen(!isModalOpen);
  // }

  return (
    <>
      <Header />
      {/* <Container>
        <form>

          <input
            value={novoDesconto}
            placeholder="desconto"
            onChange={e => setNovoDesconto(e.target.value)}
          />
          <Select onChange={e => setPedidoId(e.target.value)}>
            <option select value="1">
              Selecionar
            </option>
            {pedidos &&
              pedidos.map((pedido, key) => (
                <option key={key} value={pedido.id}>
                  {key} - {pedido.desconto}
                </option>
              ))}
          </Select>
          <Button size="big" onClick={e => handleSubmit(e)}>
            Salvar
          </Button>
        </form>
        <hr/>
        <Select onChange={e => setPedidoIdLista(e.target.value)}>
          <option select value="1">
            Selecionar
          </option>
          {pedidos &&
            usuarios.map((usuario, key) => (
              <option key={key} value={usuario.id}>
                {key}
              </option>
            ))}
        </Select>

        <Button size="big" onClick={e => handleBusca(e)}>
          Buscar
        </Button>
        <ul>
          {pedidos &&
            pedidos.map((pedido, key) => (
              <PedidoCalcado key={key}>
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
              </PedidoCalcado>
            ))}
        </ul>
      </Container> */}
    </>
  );
}
