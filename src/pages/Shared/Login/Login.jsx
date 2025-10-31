import React from 'react'
import LogoIbvagas from '../../../assets/imgs/LogoIbvagasLogin.png';
import Input from '../../../components/ui/Input/Input.jsx';
import CheckBox from '../../../components/ui/CheckBox/CheckBox.jsx';
import Styles from './Login.module.scss';

const inputs = [
  {
    label: 'Email',
    type: 'email',
    placeholder: 'Digite seu email',
  },
  {
    label: 'Senha',
    type: 'password',
    placeholder: 'Digite sua senha',
  },
];



function Login() {
  return (
    <section>
        <img src={LogoIbvagas} alt="Logo ibvagas com legenda" />
        <form>
          {inputs.map((inputs) => (
            <Input
              key={inputs.label}
              type={inputs.type}
              placeholder={inputs.placeholder}
              /> 
          ))}
          <CheckBox 
          name="rememberMe" label="Lembrar-me" />
        
        </form>
    </section>
  )
}

export default Login    