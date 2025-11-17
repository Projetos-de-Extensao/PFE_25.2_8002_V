import { useState, useEffect } from 'react';
import styles from './JobsFeedPage.module.scss'
import JobCard from '../../../components/vagas/JobCards/JobCard.jsx'
import MainHeader from '../../../components/Layout/MainHeader/MainHeader.jsx'
import Sidebar from '../../../components/Layout/Sidebar/Sidebar.jsx'
import Overlay from "../../../components/ui/Overlay/Overlay.jsx";
import Filter from "../../../components/ui/Filter/Filter.jsx";
import FilterIcon from '../../../assets/imgs/filter-svgrepo-com.png'
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

    const vagasDeExemplo = [
        {
            id: 1,
            time: 'Há 2 semanas',
            materia: 'Inteligência Artificial',
            professor: 'Juliana Paes',
            description: 'Oportunidade para monitoria em IA, cobrindo algoritmos de machine learning, redes neurais e processamento de linguagem natural...',
            responsibilities: [
                'Ajudar na implementação de modelos com Scikit-learn/TensorFlow.',
                'Explicar conceitos matemáticos por trás dos algoritmos.',
                'Conduzir sessões de revisão antes das provas.',
            ],
        },

        {
            id: 2,
            time: 'Há 2 semanas',
            materia: 'Inteligência Artificial',
            professor: 'Juliana Paes',
            description: 'Oportunidade para monitoria em IA, cobrindo algoritmos de machine learning, redes neurais e processamento de linguagem natural...',
            responsibilities: [
                'Ajudar na implementação de modelos com Scikit-learn/TensorFlow.',
                'Explicar conceitos matemáticos por trás dos algoritmos.',
                'Conduzir sessões de revisão antes das provas.',
            ],
        },

    ];


export default function JobsFeedPage() {
    const filters = ['professor', 'materia'];

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [jobList, setJobList] = useState(vagasDeExemplo);
    const navigate = useNavigate();
    
    


    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    function apiFetch() {
        // Aqui vai ficar o código de buscar na api encapsulado (função tem que retornar um array de objetos)
        return vagasDeExemplo;
    }


    function filtrarPor(valores) {
    const vagas = apiFetch();

    const vagasFiltradas = vagas.filter((vaga) => {
        return Object.entries(valores).every(([chave, valor]) => {
            if (!valor) return true; // ignora selects vazios
            const campo = String(vaga[chave] || '').toLowerCase();
            return campo.includes(String(valor).toLowerCase());
        });
    });

    setJobList(vagasFiltradas);
}


    function mostrarFiltros() {
        setShowFilters(!showFilters)
        
    }

    function mostrarDetalhes(id,vaga){
        const path = `/details/${id}`
        navigate(path, {state:{vagaCompleta : vaga}})

    }
    function aplicar(id,vaga){
        const path = `/aplication/${id}`
        navigate(path, {state:{vagaCompleta : vaga}})

    }

return (
    <>
        <Sidebar isOpen={isSidebarOpen} />
        <Overlay isVisible={isSidebarOpen} onClick={closeSidebar} />
        <MainHeader onMenuClick={toggleSidebar} />
        <main className={styles.feedMain}>
            <section className={styles.feedMain__box}>
                <div className={styles.feedMain__header}>
                    <h1 className={styles.feedMain__materia}>Vagas Recentes</h1><img src={FilterIcon} alt="icone de filtro" className={styles['img-filter']} onClick={mostrarFiltros}/>
                </div>
                <Filter 
                filtros={filters}
                json={vagasDeExemplo}
                mostrar={showFilters}
                onSubmit={(valores) => filtrarPor(valores)}
                />
                {jobList.map((vaga) => (
                    <JobCard
                        key={vaga.id}
                        id={vaga.id}
                        time={vaga.time}
                        materia={vaga.materia}
                        professor={vaga.professor}
                        description={vaga.description}
                        responsibilities={vaga.responsibilities}
                        onClick={() =>aplicar(vaga.id,vaga)}
                        detalhes={{id:vaga.id, vagaCompleta:vaga}}
                    />
                ))}
            </section>
        </main>
    </>
)

}