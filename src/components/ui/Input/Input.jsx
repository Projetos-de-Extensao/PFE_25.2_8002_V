import styles from './Input.module.scss'

export default function Input ({label, name, placeholder, type = 'text'}){
    return(
        <div className={styles['input-box']}>
            {label && ( <label htmlFor={name} className={styles['input-box__label']}>{label}</label>   )}
            <input id={name} name={name} type={type} placeholder={placeholder} className={styles['input-box__input']}></input>
        </div>
    )
}