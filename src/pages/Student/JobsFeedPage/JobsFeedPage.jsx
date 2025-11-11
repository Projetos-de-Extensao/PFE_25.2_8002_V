import { useState, useEffect } from 'react';
import styles from './JobsFeedPage.module.scss'
import JobCard from '../../../components/vagas/JobCards/JobCard.jsx'
import MainHeader from '../../../components/Layout/MainHeader/MainHeader.jsx'
import Sidebar from '../../../components/Layout/Sidebar/Sidebar.jsx'
import Overlay from "../../../components/ui/Overlay/Overlay.jsx";
import Filter from "../../../components/ui/Filter/Filter.jsx";

const vagasDeExemplo = [
    {
        id: 1,
        time: 'Há 3 horas',
        materia: 'Programação Estruturada',
        professor: 'Cassius Moreira',
        description: 'Buscamos um(a) monitor(a) para apoiar turmas em lógica e construção de algoritmos...',
        responsibilities: [
            'Tirar dúvidas sobre variáveis, controle de fluxo, etc.',
            'Apoiar exercícios práticos e projetos curtos em C.',
            'Corrigir listas e dar feedback objetivo.',
        ],
    },
    {
        id: 2,
        time: 'Há 2 dias',
        materia: 'Análise de Dados',
        professor: 'Maria Silva',
        description: 'Vaga para monitor(a) com conhecimento em Python, Pandas e bibliotecas de visualização...',
        responsibilities: [
            'Auxiliar na preparação de datasets.',
            'Ajudar alunos com os notebooks de exercícios.',
        ],
    },
    {
        id: 3,
        time: 'Há 4 dias',
        materia: 'Desenvolvimento Web Front-End',
        professor: 'Carlos Oliveira',
        description: 'Procura-se monitor(a) com experiência em React, HTML5 e CSS3 (SASS/SCSS) para auxiliar a turma...',
        responsibilities: [
            'Realizar code reviews dos projetos dos alunos.',
            'Tirar dúvidas sobre componentização e estado.',
            'Auxiliar na depuração de código e layout.',
        ],
    },
    {
        id: 4,
        time: 'Há 1 semana',
        materia: 'Banco de Dados',
        professor: 'Ana Beatriz',
        description: 'Vaga para monitoria em Banco de Dados, focado em SQL e modelagem relacional. Desejável conhecimento em NoSQL...',
        responsibilities: [
            'Ajudar os alunos a criar diagramas entidade-relacionamento.',
            'Preparar e corrigir listas de exercícios de SQL.',
            'Explicar conceitos de normalização e transações.',
        ],
    },

    {
        id: 5,
        time: 'Há 1 semana',
        materia: 'Engenharia de Software',
        professor: 'Ricardo Souza',
        description: 'Buscando monitor(a) para a disciplina de Engenharia de Software, com foco em metodologias ágeis e UML...',
        responsibilities: [
            'Auxiliar os grupos na aplicação do Scrum/Kanban.',
            'Tirar dúvidas sobre diagramas UML (Caso de Uso, Classes).',
            'Apoiar na documentação e requisitos de projetos.',
        ],
    },
    {
        id: 6,
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
        id: 7,
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


    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    function apiFetch() {
        // Aqui vai ficar o código de buscar na api encapsulado (função tem que retornar um array de objetos)
        return vagasDeExemplo;
    }


    function filtrarPorProfessor() {
        let vagas = apiFetch();
        let vagasFiltradas = vagas.filter((vaga) => vaga.professor.includes(filter));
        return vagasFiltradas;
    };


return (
    <>
        <Sidebar isOpen={isSidebarOpen} />
        <Overlay isVisible={isSidebarOpen} onClick={closeSidebar} />
        <MainHeader onMenuClick={toggleSidebar} />
        <main className={styles.feedMain}>
            <section className={styles.feedMain__box}>
                <h1 className={styles.feedMain__materia}>Vagas Recentes</h1>
                <Filter 
                filtros={filters}
                json={vagasDeExemplo} />
                {vagasDeExemplo.map((vaga) => (
                    <JobCard
                        key={vaga.id}
                        id={vaga.id}
                        time={vaga.time}
                        materia={vaga.materia}
                        professor={vaga.professor}
                        description={vaga.description}
                        responsibilities={vaga.responsibilities}
                    />
                ))}
            </section>
        </main>
    </>
)

}