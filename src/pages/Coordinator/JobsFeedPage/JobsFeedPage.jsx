import { useState, useEffect } from 'react';
import styles from './JobsFeedPage.module.scss'
import JobCard from '../../../components/vagas/JobCards/JobCard.jsx'
import MainHeader from '../../../components/Layout/MainHeader/MainHeader.jsx'
import Sidebar from '../../../components/Layout/Sidebar/Sidebar.jsx'
import Overlay from "../../../components/ui/Overlay/Overlay.jsx";
import Filter from "../../../components/ui/Filter/Filter.jsx";
import FilterIcon from '../../../assets/imgs/filter-svgrepo-com.png'
import { useNavigate } from 'react-router-dom';
import add from '../../../assets/imgs/add-circle-svgrepo-com.svg'


export default function JobsFeedPage() {
    const filters = ['professor', 'materia'];

    const [jobList, setJobList] = useState([]);

    const [originalData, setOriginalData] = useState([]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [filter, setFilter] = useState('');
    const nome = 'Prof Clayton';

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchVagas() {
            try {
                const response = await fetch("/db.json");
                const data = await response.json();

                setJobList(data);
                setOriginalData(data);
            } catch (error) {
                console.error("Erro ao carregar vagas:", error);
            }
        }

        fetchVagas();
    }, [])


    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    function filtrarPor(valores) {
        const vagasFiltradas = originalData.filter((vaga) => {
            return Object.entries(valores).every(([chave, valor]) => {
                if (!valor) return true;
                const campo = String(vaga[chave] || '').toLowerCase();
                return campo.includes(String(valor).toLowerCase());
            });
        });

        setJobList(vagasFiltradas);
    }

    function mostrarFiltros() {
        setShowFilters(!showFilters)
    }

    function mostrarDetalhes(id, vaga) {
        const path = `/details/${id}`
        navigate(path, { state: { vagaCompleta: vaga } })
    }

    function aplicar(id, vaga) {
        const path = `/aplication/${id}`
        navigate(path, { state: { vagaCompleta: vaga } })
    }

    const ordemEstado = {
        acepted: 1,
        applied: 2,
        finalized: 3,
        open: 4,
    };

    const jobListOrdenada = [...jobList].sort((a, b) => {
        return ordemEstado[a.state] - ordemEstado[b.state];
    });

    return (
        <>
            <Sidebar isOpen={isSidebarOpen} />
            <Overlay isVisible={isSidebarOpen} onClick={closeSidebar} />
            <MainHeader onMenuClick={toggleSidebar}
                nome={nome} />
            <main className={styles.feedMain}>
                <section className={styles.feedMain__box}>
                    <div className={styles.feedMain__header}>
                        <h1 className={styles.feedMain__materia}>Vagas Recentes</h1>
                        <img src={add} alt="icone de filtro" className={styles['img-add']} onClick={() => navigate('/create')} />
                        <img src={FilterIcon} alt="icone de filtro" className={styles['img-filter']} onClick={mostrarFiltros} />
                    </div>

                    {/* Passamos o originalData para o componente Filter saber as opções, se necessário */}
                    <Filter
                        filtros={filters}
                        json={originalData}
                        mostrar={showFilters}
                        onSubmit={(valores) => filtrarPor(valores)}
                    />

                    {jobListOrdenada.length > 0 ? (
                        jobListOrdenada.map((vaga) => (
                            <JobCard
                                
                                key={vaga.id}
                                id={vaga.id}
                                time={vaga.time}
                                state={"open"}
                                materia={vaga.materia}
                                professor={vaga.professor}
                                description={vaga.description}
                                responsibilities={vaga.responsibilities}
                                onClick={() => (mostrarDetalhes(vaga.id, vaga))}
                                detalhes={{ id: vaga.id, vagaCompleta: vaga }}
                                conteudoBotao={"Visualizar"}
                            />
                        ))
                    ) : (
                        <p>Carregando vagas ou nenhuma vaga encontrada...</p>
                    )}

                </section>
            </main>
        </>
    )
}