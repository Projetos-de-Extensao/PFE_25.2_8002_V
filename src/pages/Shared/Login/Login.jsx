  import React, { useState } from 'react'
  import LogoIbvagas from '../../../assets/imgs/LogoIbvagasLogin.png';
  import Input from '../../../components/ui/Input/Input.jsx';
  import CheckBox from '../../../components/ui/CheckBox/CheckBox.jsx';
  import Styles from './Login.module.scss';
  import Button from '../../../components/ui/Button/Button.jsx';
  import UnderlineAnchor from '../../../components/ui/UnderlineAnchor/UnderlineAnchor.jsx';
  import InputError from '../../../components/ui/InputError/InputError.jsx';

  
  function Login() {
    // Criação de estados que posteriormente vão definir qual classe nas mensagens (hidden,visible) de erro serão aplicadas
    const [emailValido, setEmailValido] = useState(true);
    const [passwordValido, setPasswordValido] = useState(true);

    const verificarEntrada = (event) => {

      // Impede o carregamento da página ao enviar o formulário
      event.preventDefault();

      // Localiza o form
      const form = event.target;

      // Pega email do form
      const email = form.email.value;

      // Pega senha do form
      const password = form.password.value;

      // Critérios de verificação do email
      if (email.includes('@alunos.ibmec.edu.br')) {
        console.log('email correto');
        setEmailValido(true);
        // Ações caso a entrada for correta
      } else {
        console.log('Credenciais inválidas');
        setEmailValido(false);
        // Ações caso a entrada for incorreta
      }

      // Critérios de verificação da senha
      if (password.length >= 8) {
        console.log('Senha Correta');
        setPasswordValido(true);
      } else {
        console.log('Senha Inválida');
        setPasswordValido(false);
      }
    };

    // Atribui a classe hidden se satisfazer as condições e visible se não.
    const errorEmail = emailValido ? 'hidden' : 'visible';
    const errorPassword = passwordValido ? 'hidden' : 'visible';

    return (
      <main className={Styles.main}>
        <section className={Styles['main__login']}>
          <img src={LogoIbvagas} alt="Logo ibvagas com legenda" className={Styles['login__logo']} />
          <form className={Styles['login__form']} onSubmit={verificarEntrada}>
            <Input
              name={'email'}
              type={'email'}
              placeholder={'Digite seu email'}
            />
            {/* Visibility é um parametro que dentro do componente InputError adiciona mais uma classe a estilização padrão */}
            <InputError
              name={'emailError'}
              message={'Email inválIdo'}
              visibility={errorEmail}
            />
            <Input
              name={'password'}
              type={'password'}
              placeholder={'Digite sua senha'}
            />
            <InputError
              name={'passwordeError'}
              message={'Senha inválida'}
              visibility={errorPassword}
            />
            <div className={Styles['login__options']}>
              <CheckBox
                name="rememberMe"
                label="Lembrar-me"
              />
              <UnderlineAnchor
                placeholder="Esqueci uma senha"
              />
            </div>
            <Button
              children={'Entrar'}
              type='submit'
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