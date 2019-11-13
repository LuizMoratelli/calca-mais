import React, { useState, useEffect } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Button from "../../styles/components/Button";
import api from "../../services/api";

import { Container, PedidoCalcado, ButtonIcon, Select } from "./styles";

// só vai poder ver os pedidos com os calcados e excluir os mesmos
export default function PedidosCalcados() {
  const [pedidos, setPedidos] = useState();
  const [pedidosCalcados, setPedidosCalcados] = useState();
  const [pedidosCalcadosId, setPedidosCalcadosId] = useState();
  const [quantidade, setQuantidade] = useState();
  const [calcadoId, setCalcadoId] = useState();

  useEffect(() => {
    getPedidos();
  }, []);

  async function handleBusca() {
  
    if(pedidosCalcadosId){
      const response = await api.get(`pedidos/${pedidosCalcadosId}/calcados`);
  
      const { data } = response;
  
      if (data) setPedidos(data);
    }
  }

  function removePedidoCalcado(pedidoCalcadoId) {
    const pedidoCalcadoFiltrados = pedidosCalcados.filter(
      pedidoCalcado => pedidoCalcado.id !== pedidoCalcadoId
    );

    setPedidosCalcados(pedidoCalcadoFiltrados);
  }

  async function handleDelete(pedidoCalcadoId) {
    removePedidoCalcado(pedidoCalcadoId);

    toast.success("Pedido Calçado excluído com sucesso!");

    const aux = await api.delete(`pedidos/${pedidoId}/calcados/${calcadoId}`, {
      "calcados-id": [pedidoCalcadoId],
    });
  }

  async function getPedidos() {
    const response = await api.get("pedidos");

    const { data } = response;

    setPedidos(data);
  }

  return (
    <>
      <Header />
      <Container>
        {/* <form>

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
        </form> */}
        {/* <hr/> */}
        <Select onChange={e => setPedidosCalcadosId(e.target.value)}>
          <option select value="1">
            Selecionar
          </option>
          {pedidosCalcados &&
            pedidosCalcados.map((pedido, key) => (
              <option key={key} value={pedido.id}>
                {key}
              </option>
            ))}
        </Select>

        <Button size="big" onClick={e => handleBusca(e)}>
          Buscar
        </Button>
        <ul>
          {pedidosCalcados &&
            pedidosCalcados.map((pedidoCalcado, key) => (
              <PedidoCalcado key={key}>
                <strong>{pedidoCalcado.quantidade}</strong>
                <strong>
                  <ButtonIcon>
                    <MdDelete
                      size={20}
                      onClick={() =>
                        handleDelete(pedidoCalcado.id)
                      }
                    />
                  </ButtonIcon>
                </strong>
              </PedidoCalcado>
            ))}
        </ul>
      </Container>
    </>
  );
}
