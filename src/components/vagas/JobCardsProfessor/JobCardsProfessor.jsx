import styles from './JobCardsProfessor.module.scss'
import Button from '../../ui/Button/Button.jsx';
import SetaBaixo from '../../../assets/imgs/setinha-card-baixo.png'
import SetaAlta from '../../../assets/imgs/setinha-preta-cima.png'
import { useState } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
// import Lapis from ... (estava importado mas não usado no snippet)

export default function JobCard({ 
    time, 
    professor, 
    title, 
    description, 
    materia, 
    responsibilities = [], 
    onClick,
    // Adicionei estas props que faltavam:
    id, 
    vagaCompleta,
    conteudoBotao = "Editar", // Dei um valor padrão caso não venha
    conteudo = "Apagar" // Dei um valor padrão caso não venha
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(prevState => !prevState);
    };

    const cardClasses = cx(styles['job-card'], {
        [styles['job-card--expanded']]: isExpanded,
    });

    // Botão genérico (Editar ou ação principal)
    const handleButtonClick = (e) => {
        e.stopPropagation();
        if (onClick) {
            onClick(e);
        }
    };

    // Função para o link de "Ver mais detalhes" (caso precise de lógica específica)
    const handleLinkClick = (e) => {
        e.stopPropagation(); // Importante para não fechar o card ao clicar no link
    };

    return (
        <article className={cardClasses} onClick={handleToggle}>
            <div className={styles['job-card__header']}>
                <div className={styles['header__text']}>
                    <span className={styles['job-card_time']}>{time}</span>
                    <h3 className={styles['job-card__title']}>{materia}</h3>
                    <p className={styles['job-card__professor']}>Por {professor}</p>
                </div>
                
                <img 
                    className={styles['job-card__toggle-icon']} 
                    src={isExpanded ? SetaAlta : SetaBaixo} 
                    alt="Expandir" 
                />
            </div>
            
            {/* O erro acontecia aqui dentro, ao tentar renderizar variáveis inexistentes */}
            {isExpanded && (
                <div className={styles['job-card__details']}>
                    <p className={styles['job-card__description']}>{description}</p>

                    <div>
                        <h4 className={styles['job-card__responsibilities-title']}>
                            Responsabilidade
                        </h4>
                        <ul className={styles['job-card__responsibilities']}>
                            {responsibilities.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <Link
                        to={`/details/${id}`} // Agora 'id' existe nas props
                        state={{ vagaCompleta: vagaCompleta }} // Agora 'vagaCompleta' existe
                        onClick={handleLinkClick} // Agora a função existe
                        className={styles['job-card__details-link']}
                    >
                        Ver mais detalhes
                    </Link>

                    <div className={styles['job-card__actions']}>
                        <Button variant="primary" size="small" onClick={handleButtonClick}>
                            {conteudoBotao} 
                        </Button>

                        <Button variant="danger" size='small' onClick={handleButtonClick}>
                            {conteudo} 
                        </Button>
                    </div>
                </div>
            )}
        </article >
    )
}