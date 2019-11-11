import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { ProductList } from "./styles";
import { formatPrice } from "../../util/format";
import api from "../../services/api";

import Header from "../../components/Header";

export default function Main() {
  const [produtos, setProdutos] = useState();

  useEffect(() => {
    async function getProdutos() {
      const response = await api.get("products");
      // formata o preço uma única vez e matém o
      // restante dos produtos, apenas adicona uma nova propriedade
      const data = response.data.map(product => ({
        ...product,
        priceFormated: formatPrice(product.price)
      }));
      setProdutos(data);
    }
  }, []);

  function handleAddProduto(id) {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  }
  return (
    <>
      <Header />
      <ProductList>
        {produtos && (
          produtos.map(produto => (
            <li key={produto.id}>
              <img src={produto.image} alt={produto.title} />
              <strong>{produto.title}</strong>
              <span>{produto.priceFormated}</span>
              <button
                type="button"
                onClick={() => handleAddProduto(produto.id)}
              >
                <div>
                  <MdAddShoppingCart size={16} color="#FFF" />{" "}
                  {produto.id || 0}
                </div>
  
                <span>Adiconar ao carrinho</span>
              </button>
            </li>
          ))
        )}
      </ProductList>
    </>
  );
}
