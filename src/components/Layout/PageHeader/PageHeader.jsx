// aqui ficará o header secundário, aquele que não tem a sidebar
import Setinha from '../../../assets/imgs/setinha.png';
import styles from './PageHeader.module.scss'

export default function PageHeader({title}){
    return(
        <header className={styles['page-header']}>
            {/* Aqui vamos futuramente utilizar o React Rounter Dom para fazer a navegação entre páginas */}
            <button className={styles['page-header__back-button']}>
                <img src={Setinha} alt="" />
            </button>
            <h2 className={styles['page-header__title']}>{title}</h2>
        </header>
    )
}