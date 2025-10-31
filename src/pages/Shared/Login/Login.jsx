import React from 'react'
import LogoIbvagas from '../../../assets/imgs/LogoIbvagasLogin.png';
import Input from '../../../components/ui/Input/Input.jsx';
import CheckBox from '../../../components/ui/CheckBox/CheckBox.jsx';
import Styles from './Login.module.scss';
import Button from '../../../components/ui/Button/Button.jsx';
import UnderlineAnchor from '../../../components/ui/UnderlineAnchor/UnderlineAnchor.jsx';

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
    <main className={Styles.main}>
      <section className={Styles['main__login']}>
          <img src={LogoIbvagas} alt="Logo ibvagas com legenda" className={Styles['login__logo']} />
          <form className={Styles['login__form']}>
            {inputs.map((inputs) => (
              <Input
                key={inputs.label}
                type={inputs.type}
                placeholder={inputs.placeholder}
                /> 
            ))}
            <div className={Styles['login__options']}>
              <CheckBox 
              name="rememberMe" label="Lembrar-me" />

              <UnderlineAnchor
              placeholder="Esqueci minha senha" />
            </div>
            <Button
            children={'Entrar'}
            />
            <div className={Styles['login__line']}>
                  <div className={Styles['line']}></div>
                  <p>ou</p>
                  <div className={Styles['line']}></div>
            </div>
            <Button
              children={'Criar uma nova conta'}
              variant='alternative'
            />


          </form>
      </section>
    </main>
  )
}

export default Login    