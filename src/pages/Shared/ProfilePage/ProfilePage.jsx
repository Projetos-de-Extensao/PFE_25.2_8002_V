import React from 'react'
import PageHeader from '../../../components/Layout/PageHeader/PageHeader.jsx'
import Styles from "./ProfilePage.module.scss"
import FotoPerfil from "../../../assets/imgs/group19.png"
import Input from '../../../components/ui/Input/Input.jsx'
import Button from '../../../components/ui/Button/Button'
import Lapis from '../../../assets/imgs/pencil-solid-full.svg'
import { useNavigate } from 'react-router-dom'

function ProfilePage() {
    const navigate = useNavigate()
    return (
        <>
            <PageHeader
                title="Perfil" />
            <main className={Styles['main']}>
                <section className={Styles['perfil']}>
                    <div className={Styles['perfil__div']}><img src={FotoPerfil} alt="Foto de Perfil" className={Styles['perfil__div__foto']} /></div>
                    <div className={Styles['perfil__dados']}>

                        <div className={Styles['perfil__dados__opcoes']}>
                            <div className={Styles['perfil__dados__opcoes__line']}></div>
                            <a href="" className={Styles['perfil__dados__opcoes__editar']}>
                                <img src={Lapis} alt="icone de edição" />
                            </a>
                        </div>

                        <Input
                            label="Nome e Sobrenome *"
                            placeholder="John"
                            name="Nome-Sobrenome"
                        />
                        <Input
                            label="Senha *"
                            placeholder="************"
                            name="senha" />
                        <Input
                            label="Celular"
                            placeholder="(21) 99999-2155"
                            name="telefone" />
                        <Input
                            label="Como você quer ser chamado?"
                            placeholder="Ele/Dele"
                            name="pronomes" />
                            
                    </div>
                    <div className={Styles['perfil__actions']}>
                    <Button 
                        size='profile'
                        children="Solicitar alteração de senha"
                        onClick={() => navigate("/reset")} />
                    <a href="" className={Styles['perfil__sair']}>Sair</a>
                    </div>

                </section>
            </main>
        </>

    )
}

export default ProfilePage