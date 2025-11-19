import styles from './Select.module.scss';

export default function Select({ label, name, options, placeholder, onChange, value }) {
    return (
        <div className={styles.container}>
            <label htmlFor={name} className={styles.label}>
                {label}
            </label>
            <div className={styles.selectWrapper}>
                <select 
                    name={name} 
                    id={name} 
                    className={styles.select}
                    onChange={onChange}
                    value={value}
                    defaultValue=""
                >
                    <option value="" disabled>
                        {placeholder || "Selecione uma opção"}
                    </option>
                    
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}