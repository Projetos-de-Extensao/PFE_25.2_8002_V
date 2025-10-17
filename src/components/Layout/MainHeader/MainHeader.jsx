import styles from './MainHeader.module.scss';
import avatarPlaceholder from '../../../assets/imgs/Avatar.png'
import hamburguer from '../../../assets/imgs/menu_svgrepo.com.png'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.header__up}>
                <div className={styles.header__box}>
                    <button className={styles.header__hamburger} aria-label="Abrir menu">
                        <img src={hamburguer} alt="" />
                    </button>
                    <span className={styles.header__greeting}>Olá, João Gabriel!</span>
                </div>
                <img
                    src={avatarPlaceholder}
                    alt="Avatar do usuário"
                    className={styles.header__avatar}
                />
            </div>

            <div className={styles.header__down}>
                <a href="/candidaturas" className={styles.header__link}>
                    Minhas candidaturas &gt;
                </a>
            </div>
        </header>
    );
}