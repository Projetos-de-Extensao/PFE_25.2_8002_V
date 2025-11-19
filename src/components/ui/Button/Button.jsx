// 1. A importação agora coloca os estilos no objeto 'styles'
import styles from "./Button.module.scss";

export default function Button({ children, onClick, type = 'button', variant = 'primary', size = 'default', onSubmit = null }) {
    
    const buttonClass = `
        ${styles.btn} 
        ${styles[`btn--${variant}`]} 
        ${size === 'small' ? styles['btn--small'] : ''}
        ${size === 'medium' ? styles['btn--medium'] : ''}
        ${size === 'profile' ? styles['btn--profile'] : ''}
    `;

    return (
        // O .trim() no final é opcional, mas remove espaços extras
        <button className={buttonClass.trim()} type={type} onClick={onClick}>
            {children}
        </button>
    )
}