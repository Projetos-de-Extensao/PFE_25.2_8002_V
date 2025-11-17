import styles from './Sidebar.module.scss';
import LogoSimples from '../../../assets/imgs/ibvagas-1.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({isOpen}) {
    const sidebarClasses = `${styles.sidebar} ${isOpen ? styles['sidebar--open'] : ''}`;
    const navigate = useNavigate();
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
                            <Link className={styles.sidebar__navLink} to='/myprofile' >Minha Conta</Link>
                        </li>

                        <li className={styles.sidebar__navItem}>
                            <Link className={`${styles.sidebar__navLink} ${styles['sidebar__navLink--logout']}`} to='/'>
                                Sair
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className={styles.sidebar__footer}>
                    <Link className={styles.sidebar__footerLink} onClick={() => navigate('/feed/aluno')}>Modo Aluno</Link>
                    <Link className={styles.sidebar__footerLink} onClick={() => navigate('/feed/professor')}>Modo Professor</Link>
                    <Link className={styles.sidebar__footerLink} onClick={() => navigate('/feed/coordenador')}>Modo Coordenador</Link>
                </div>
            </div>

        </aside >
    );
}