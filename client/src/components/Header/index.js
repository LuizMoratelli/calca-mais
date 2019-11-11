import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket, MdAccountCircle, MdStorage, MdBorderColor } from 'react-icons/md'
import { Container, Opcao, Logo} from './styles';

import logo from '../../assets/images/logo2.png';

function Header() {
  return (
    <Container>
      <Link to="/">
        <Logo src={logo} alt="calça mais" />
      </Link>
      <Opcao to="/pedidos">
        <div>
          <strong>Pedidos</strong>
          <span>itens</span>
        </div>
        <MdShoppingBasket size={36} color="#fff"/>
      </Opcao>
      <Opcao to="/usuarios">
        <div>
          <strong>Usuarios</strong>
          <span>itens</span>
        </div>
        <MdAccountCircle size={36} color="#fff"/>
      </Opcao>
      <Opcao to="/categorias">
        <div>
          <strong>Categorias</strong>
          <span>itens</span>
        </div>
        <MdStorage size={36} color="#fff"/>
      </Opcao>
      <Opcao to="/calcados">
        <div>
          <strong>Calçados</strong>
          <span>itens</span>
        </div>
        <MdBorderColor size={36} color="#fff"/>
      </Opcao>
    </Container>
  );
}

export default Header;
