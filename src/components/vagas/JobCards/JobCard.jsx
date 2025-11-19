import styles from './JobCard.module.scss';
import Button from '../../ui/Button/Button';
import SetaBaixo from '../../../assets/imgs/setinha-card-baixo.png';
import SetaAlta from '../../../assets/imgs/setinha-preta-cima.png';
import { useState } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

export default function JobCard({
    time,
    professor,
    title,
    description,
    materia,
    responsibilities = [],
    onClick,
    detalhes,
    state,
    onApply,
    conteudoBotao
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const { id, vagaCompleta } = detalhes || {};

    const handleToggle = () => {
        setIsExpanded(prev => !prev);
    };

    const cardClasses = cx(styles['job-card'], {
        [styles['job-card--expanded']]: isExpanded,
    });

    function estadoClasse() {
        switch (state) {
            case 'open':
                return "aberta";
            case 'applied':
                return "aplicada"
            case 'acepted':
                return "aceito"
            default:
                return "finalizada"
        }
    }

    // Função pura para retornar a classe correta
    function getEstadoClasse() {
        switch (state) {
            case 'open':
                return styles['job-card__state'] + ' ' + styles['job-card__state--open'];
            case 'applied':
                return styles['job-card__state'] + ' ' + styles['job-card__state--applied'];
            case 'acepted':
                return styles['job-card__state'] + ' ' + styles['job-card__state--acepted'];
            default:
                return styles['job-card__state'] + ' ' + styles['job-card__state--finalized'];
        }
    }

    const handleButtonClick = (e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
    };

    const handleLinkClick = (e) => {
        e.stopPropagation();
    };

    return (
        <article className={cardClasses} onClick={handleToggle}>
            <div className={styles['job-card__header']}>
                <div className={styles['header__text']}>
                    <span className={styles['job-card_time']}>{time}</span>
                    <h3 className={styles['job-card__title']}>{materia}</h3>
                    <p className={styles['job-card__professor']}>Por {professor}</p>
                </div>

                {/* Classe dinâmica sem useEffect */}
                <div className={getEstadoClasse()}>{estadoClasse()}</div>

                <img
                    className={styles['job-card__toggle-icon']}
                    src={isExpanded ? SetaAlta : SetaBaixo}
                />
            </div>

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
                        to={`/details/${id}`}
                        state={{ vagaCompleta: vagaCompleta }}
                        onClick={handleLinkClick}
                        className={styles['job-card__details-link']}
                    >
                        Ver mais detalhes
                    </Link>

                    <div className={styles['job-card__actions']}>
                        {/* REMOVA O LINK. Use apenas o Button com o stopPropagation aqui */}

                        <Button
                            onClick={(e) => {
                                e.stopPropagation(); // Isso impede o erro 404 (clique "atravessando" o card)
                                onApply(); // Isso chama a navegação correta que está no JobsFeedPage
                            }}
                            variant="primary"
                        >
                            {conteudoBotao}
                        </Button>
                    </div>
                </div>
            )}
        </article>
    );
}
