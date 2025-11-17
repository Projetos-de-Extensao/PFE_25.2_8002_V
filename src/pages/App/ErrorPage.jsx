import React from 'react';
import Styles from './ErrorPage.module.scss';
import Triste from '../../assets/imgs/carinhatriste.png';
import PageHeader from '../../components/Layout/PageHeader/PageHeader';
import Return from '../../assets/imgs/return.png'

const ErrorPage = () => {
  return (
    <div className={Styles["error-page"]}>
        <PageHeader title="404" />
        <div className={Styles['message']}>
            <img src={Triste} className={Styles['message__img']} alt="" />
            Oops! Parece que não temos o que procura...
        </div>
        <a href="/feed/aluno" className={Styles['message__link']}>Voltar <img src={Return} alt="seta de voltar" className={Styles['message__link-icon']}/></a>
    </div>
  )
}

export default ErrorPage;