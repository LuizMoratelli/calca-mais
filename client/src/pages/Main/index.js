import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import Button from "../../styles/components/Button";
import { ListaCalcados, Select, Container } from "./styles";

import { formatPrice } from "../../util/format";
import api from "../../services/api";

import Header from "../../components/Header";

export default function Main() {
  const [calcados, setCalcados] = useState();
  const [novoPedido, setNovoPedido] = useState();
  const [categorias, setCategorias] = useState();
  const [pedidos, setPedidos] = useState();
  const [categoriaId, setCategoriaId] = useState();
  const [pedidoId, setPedidoId] = useState();

  useEffect(() => {
    getCategorias();
    getPedidos();
  }, []);

  async function getCategorias() {
    const response = await api.get("categorias");

    const { data } = response;

    setCategorias(data);
  }

  function handleAdd(calcadoId, quantidade){

    const dataAdd = calcados.map(calcado => {
      if(calcado.id === calcadoId){
        calcado.quantidade += 1;
      }
      return{
        ...calcado,
      }
    });
    setCalcados(dataAdd);
  }

  async function getPedidos() {
    const response = await api.get("pedidos");
    const { data } = response;

    setPedidos(data);
  }

  async function handleBusca() {
    if (categoriaId) {
      const response = await api.get(`categorias/${categoriaId}/calcados`);

      const data = response.data.map(calcado => ({
        ...calcado,
        precoformatado: formatPrice(calcado.preco),
        quantidade: 0,
      }));

      if (data) setCalcados(data);
    }
  }

  async function handleSubmit() {

    const calcadosSelecionados = calcados.filter(calcado => calcado.quantidade > 0);
    const aux = await api.post(`pedidos/${pedidoId}/calcados`, {
      calcados: calcadosSelecionados
    });
    window.location.reload();

  }

  return (
    <>
      <Header />
      <Container>
        <form>
          <Select onChange={e => setPedidoId(e.target.value)}>
            <option select value="1">
              Selecionar
            </option>
            {pedidos &&
              pedidos.map((pedido, key) => (
                <option key={key} value={pedido.id}>
                  {key + 1}
                </option>
              ))}
          </Select>
          <Button size="big" onClick={e => handleSubmit(e)}>
            Salvar Pedido
          </Button>
        </form>
      </Container>
      <Select onChange={e => setCategoriaId(e.target.value)}>
        <option select value="1">
          Selecionar
        </option>
        {categorias &&
          categorias.map((usuario, key) => (
            <option key={key} value={usuario.id}>
              {usuario.nome}
            </option>
          ))}
      </Select>

      <Button size="big" onClick={e => handleBusca(e)}>
        Buscar
      </Button>
      <ListaCalcados>
        {calcados &&
          calcados.map(calcado => (
            <li key={calcado.id}>
              <img
                src="https://static.netshoes.com.br/produtos/tenis-adidas-duramo-lite-2-0-masculino/28/COL-3586-128/COL-3586-128_zoom1.jpg?ims=120x"
                alt="tenis"
              />
              <strong>{calcado.nome}</strong>
              <span>{calcado.precoformatado}</span>
              <button
                type="button"
                onClick={ () => handleAdd(calcado.id, calcado.quantidade) }
              >
                <div>
                  <MdAddShoppingCart size={16} color="#FFF" /> {calcado.quantidade}
                </div>

                <span >Adiconar ao pedido</span>
              </button>
            </li>
          ))}
      </ListaCalcados>
    </>
  );
}
