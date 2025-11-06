import styles from './JobCard.module.scss'
import Button from '../../ui/Button/Button';
import Seta from '../../../assets/imgs/setinha-card-baixo.png'
import { useState } from 'react';


// Criar uma condicional para o card renderizar um ou mais botão dependendo do usuário

export default function JobCard({ time, professor, title, description, responsibilities = [] }) {
    const [isExpanded, setIsExpanded] = useState(false);

    

    return (
        <article className={styles['job-card']} onClick={() => setIsExpanded(!isExpanded)} >
            <div className={styles['job-card__header']}>
                <div className={styles['header__text']}>
                    <span className={styles['job-card_time']}>{time}</span>
                    <h3 className={styles['job-card__title']}>{title}</h3>
                    <p className={styles['job-card__professor']}>Por {professor}</p>
                </div>
                <img className={styles[isExpanded ? 'job-card__header__toggle-icon--rotate' : 'job-card__header__toggle-icon']} src={Seta} />
            </div>
                <div className={styles[isExpanded ? 'job-card__details':'job-card__details--hidden']}>
                    <p className={styles['job-card__description']}>{description}</p>
                    <div>
                        <h4 className={styles['job-card__responsibilities-title']}>Responsabilidade</h4>
                        <ul className={styles['job-card__responsibilities']}>
                            {/* o li está dentro do loop mpa, com o objetivo de criar um li para cada arrya no import */}
                            {responsibilities.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    {/* futuramente será mudado para a tag link com o uso do react rounter dom */}
                    <a href="#" className={styles['job-card__details-link']}>Ver mais detalhes</a>
                    <div className={styles['job-card__actions']}>
                        <Button variant="primary">Me candidatar!</Button>
                    </div>
                </div>
        </article >
    )
}