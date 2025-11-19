import styles from './MainHeader.module.scss';
import avatarPlaceholder from '../../../assets/imgs/Avatar.png'
import hamburguer from '../../../assets/imgs/menu_svgrepo.com.png'

export default function Header({onMenuClick,nome}) {
    return (
        <header className={styles.header}>
            <div className={styles.header__up}>
                <div className={styles.header__box}>
                    <button onClick={onMenuClick} className={styles.header__hamburger} aria-label="Abrir menu">
                        <img src={hamburguer} alt="" />
                    </button>
                    <span className={styles.header__greeting}>{`Olá, ${nome}!`}</span>
                </div>
                <img
                    src={avatarPlaceholder}
                    alt="Avatar do usuário"
                    className={styles.header__avatar}
                />
            </div>

        </header>
    );
}