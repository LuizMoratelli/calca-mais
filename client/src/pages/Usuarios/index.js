import React, { useState, useEffect } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Button from "../../styles/components/Button";
import api  from "../../services/api";

import { Container, User, ButtonIcon } from "./styles";

export default function Users() {
  const [usuarios, setUsuarios] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState();
  const [id, setId] = useState();
  const [newUser, setNewUser] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function getUsuarios() {
    const response = await api.get('usuarios');

    const { data } = response;

    if (data) setUsuarios(data);
  }

  useEffect(() => {getUsuarios()} , []);

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post('usuarios', {
      nome: newUser,
      email: newEmail,
      password: newPassword
    });

    toast.success("Usuário criado com sucesso!");
    getUsuarios();
    setNewEmail('');
    setNewUser('');
    setNewPassword('');
  }

  function removeUser(id) {
    const usersFilter = usuarios.filter(usuario => usuario.id !== id);

    setUsuarios(usersFilter);
  }

  async function handleDelete(id) {
    removeUser(id);
    toast.success("Usuário excluído com sucesso!");
    await api.delete(`usuarios/${id}`);
  }

  function handleEdit({ id, nome, email, password }) {
    setUser(nome);
    setId(id);
    setEmail(email);
    setPassword(password);
    setIsModalOpen(true);
  }

  async function handleSendEdit(){
    const aux = await api.patch(`usuarios/${id}`, {
      nome: user,
      email: email,
      password: password
    });

    toast.success("Usuário alterado com sucesso!");
    setIsModalOpen(!isModalOpen);
    getUsuarios();
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
            value={newUser}
            placeholder="Usuario"
            onChange={e => setNewUser(e.target.value)}
          />
          <input
            value={newEmail}
            type="email"
            onChange={e => setNewEmail(e.target.value)}
            placeholder="email@example.com"
          />

          <input
            value={newPassword}
            type="password"
            onChange={e => setNewPassword(e.target.value)}
            placeholder="senha"
          />
          <Button size="big" onClick={e => handleSubmit(e) }>Salvar</Button>
        </form>
        <ul>
          {usuarios && 
            usuarios.map((user, key) => (
              <User key={key}>
                <strong>{user.nome}</strong>
                <strong>{user.email}</strong>
                <strong>
                  <ButtonIcon>
                    <MdModeEdit size={20} onClick={() => handleEdit(user)} />
                  </ButtonIcon>
                  <ButtonIcon>
                    <MdDelete size={20} onClick={() => handleDelete(user.id)} />
                  </ButtonIcon>
                </strong>
              </User>
            )) }
        </ul>
          {isModalOpen && ( 
            <Modal size="big">
              <h1>Edição Usuário</h1>
              <form>
                <span>Nome</span>
                <input
                  name="user"
                  value={user}
                  onChange={e => setUser(e.target.value)}
                />
                <span>Email</span>
                <input
                  name="user"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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