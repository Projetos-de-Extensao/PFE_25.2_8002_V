import styles from './Sidebar.module.scss';
import LogoSimples from '../../../assets/imgs/ibvagas-1.png'

export default function Sidebar({isOpen}) {
    const sidebarClasses = `${styles.sidebar} ${isOpen ? styles['sidebar--open'] : ''}`;
    return (
        <aside className={sidebarClasses}>


            <img
                src={LogoSimples}
                alt="Logo IBVagas"
                className={styles.sidebar__logo}
            />

            <hr className={styles.sidebar__divider} />

            <div className={styles.sidebar__body}>
                <nav className={styles.sidebar__nav}>
                    <ul className={styles.sidebar__navList}>
                        <li className={styles.sidebar__navItem}>
                            <a className={styles.sidebar__navLink}>Minha Conta</a>
                        </li>

                        <li className={styles.sidebar__navItem}>
                            <a className={`${styles.sidebar__navLink} ${styles['sidebar__navLink--logout']}`}>
                                Sair
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className={styles.sidebar__footer}>
                    <p className={styles.sidebar__footerLink}>Modo Aluno</p>
                    <p className={styles.sidebar__footerLink}>Modo Professor</p>
                </div>
            </div>

        </aside >
    );
}