import React from 'react'
import style from './PasswordReset.module.scss';
import PageHeader from '../../../components/Layout/PageHeader/PageHeader.jsx'
import Input from '../../../components/ui/Input/Input.jsx'
import Button from '../../../components/ui/Button/Button.jsx';
import { useNavigate } from 'react-router-dom'; 

function PasswordReset() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader />
      <main className={style['main']}>
        <section className={style['redefinicao']}>
          <div className={style['redefinicao__container-texto']}>
            <h1 className={style['redefinicao__container-texto__titulo']} >Redefinição de Senha!</h1>

            <p className={style['redefinicao__container-texto']}>
              Informe um email e enviaremos um link para recuperação da sua senha
            </p>
          </div>
          <form className={style['redefinicao__container-form']}>

            <div className={style['redefinicao__container-form__input']}>
              <Input
                placeholder='Digite seu email'
                label='Email'
                name='email_recuperacao'
              />
            </div>

            <Button
              children='Enviar link de recuperação'
              variant='primary'
              type='submit'
              onClick={() => navigate('/resetconfirmation')}
            />
          </form>
        </section>

      </main>
    </div>
  )
}

export default PasswordReset