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
      <Opcao to="/usuarios">
        <div>
          <strong>Usuarios</strong>
        </div>
        <MdAccountCircle size={36} color="#fff"/>
      </Opcao>
      <Opcao to="/categorias">
        <div>
          <strong>Categorias</strong>
        </div>
        <MdStorage size={36} color="#fff"/>
      </Opcao>
      <Opcao to="/pedidos">
        <div>
          <strong>Pedidos</strong>
        </div>
        <MdShoppingBasket size={36} color="#fff"/>
      </Opcao>
      <Opcao to="/pedidoscalcado">
        <div>
          <strong>Pedidos Calçados</strong>
        </div>
        <MdShoppingBasket size={36} color="#fff"/>
      </Opcao>
      <Opcao to="/calcados">
        <div>
          <strong>Calçados</strong>
        </div>
        <MdBorderColor size={36} color="#fff"/>
      </Opcao>
    </Container>
  );
}

export default Header;
