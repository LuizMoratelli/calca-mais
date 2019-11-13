import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AuthActions from '../../../store/ducks/auth';

import Button from '../../../styles/components/Button'
import { Container, SignForm } from './styles';

class SignUp extends Component{
    static propTypes = {
        signUpRequest: PropTypes.func.isRequired,
    }
    state = {
        nome: '', 
        email: '',
        password: '',
    }
    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handlesubmit = (e) => {
        e.preventDefault();

        const { nome, email, password } = this.state;

        const { signUpRequest } = this.props;

        //call action redux
        signUpRequest(nome, email, password);
    }
    render(){
        const { nome, email, password } = this.state;
        return (
            <Container>
                <SignForm onSubmit={ this.handlesubmit }>
                    <h1>Registre-se</h1>

                    <span>Name</span>
                    <input type="text" name="nome" value={nome} onChange={this.handleInputChange} />

                    <span>E-mail</span>
                    <input type="email" name="email" value={email} onChange={this.handleInputChange} />

                    <span>Senha</span>
                    <input type="password" name="password" value={password} onChange={this.handleInputChange} />

                    <Button size="big" type="submit" onClick={ this.handlesubmit } >
                        Registrar-se
                    </Button>

                </SignForm>
            </Container> 
        );
    }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch); 
   
export default connect(null, mapDispatchToProps)(SignUp);
