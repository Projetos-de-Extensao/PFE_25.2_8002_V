import { useState, useEf, fect } from 'react';
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
        time: 'Há 3 horas',
        state: "open",
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
        state: "open",
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
        state: "open",
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
        state: "open",
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
        state: "finalized",
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
        state: "open",
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
        state: "open",
        materia: 'Inteligência Artificial',
        professor: 'Juliana Paes',
        description: 'Oportunidade para monitoria em IA, cobrindo algoritmos de machine learning, redes neurais e processamento de linguagem natural...',
        responsibilities: [
            'Ajudar na implementação de modelos com Scikit-learn/TensorFlow.',
            'Explicar conceitos matemáticos por trás dos algoritmos.',
            'Conduzir sessões de revisão antes das provas.',
        ],
    },
    // --- Novos itens adicionados ---
    {
        id: 8,
        time: 'Há 1 dia',
        state: "open",
        materia: 'Cálculo Diferencial e Integral I',
        professor: 'Dr. Oswaldo Cruz',
        description: 'Vaga essencial para apoio na disciplina de Cálculo I, focada em limites, derivadas e integrais básicas.',
        responsibilities: [
            'Resolver exercícios de fixação sobre Limites e Continuidade.',
            'Ajudar na compreensão de regras de derivação.',
            'Realizar plantões de dúvida para provas.',
        ],
    },
    {
        id: 9,
        time: 'Há 5 dias',
        state: "applied",
        materia: 'Redes de Computadores',
        professor: 'Paula Fernandes',
        description: 'Buscamos monitor(a) com bom entendimento de pilhas de protocolo (TCP/IP), roteamento e sub-redes.',
        responsibilities: [
            'Auxiliar na configuração de redes em simuladores (Packet Tracer, GNS3).',
            'Explicar os modelos OSI e TCP/IP.',
            'Apoiar na solução de problemas de conectividade.',
        ],
    },
    {
        id: 10,
        time: 'Há 1 semana',
        state: "open",
        materia: 'Desenvolvimento Mobile (Android)',
        professor: 'Renato Sales',
        description: 'Procura-se monitor(a) para a disciplina de desenvolvimento de apps Android, utilizando Kotlin e Android Studio.',
        responsibilities: [
            'Tirar dúvidas sobre Ciclo de Vida de Activity e Fragments.',
            'Auxiliar na implementação de layouts responsivos (ConstraintLayout).',
            'Apoiar na integração com APIs RESTful.',
        ],
    },
    {
        id: 11,
        time: 'Há 3 semanas',
        state: "finalized",
        materia: 'Estruturas de Dados I',
        professor: 'Dr. Oswaldo Cruz', // Professor repetido em matéria diferente (coerente)
        description: 'Vaga para monitoria em Estruturas de Dados, com foco em Listas, Filas, Pilhas e Árvores (implementação em Java ou C++).',
        responsibilities: [
            'Realizar correção de listas de exercícios e códigos.',
            'Explicar complexidade de tempo e espaço (notação Big O).',
            'Apoiar na implementação de árvores binárias de busca.',
        ],
    },
    {
        id: 12,
        time: 'Há 2 dias',
        state: "open",
        materia: 'Sistemas Operacionais',
        professor: 'Maria Silva', // Professora repetida em matéria diferente (coerente)
        description: 'Monitor(a) para apoio em conceitos de Gerenciamento de Processos, Memória e Sistemas de Arquivos.',
        responsibilities: [
            'Auxiliar com comandos básicos de Shell Script (Linux).',
            'Explicar algoritmos de escalonamento de processos.',
            'Tirar dúvidas sobre semáforos e *deadlocks*.',
        ],
    },
    {
        id: 13,
        time: 'Há 4 horas',
        state: "open",
        materia: 'Desenvolvimento Web Back-End',
        professor: 'Carlos Oliveira', // Professor repetido na área de Web (coerente)
        description: 'Vaga de monitoria focada em Node.js, Express e integração com Banco de Dados (MongoDB/PostgreSQL).',
        responsibilities: [
            'Apoiar na criação de APIs RESTful.',
            'Tirar dúvidas sobre autenticação (JWT) e segurança.',
            'Auxiliar na implementação de testes unitários.',
        ],
    },
    {
        id: 14,
        time: 'Há 1 mês',
        state: "acepted",
        materia: 'Lógica Matemática',
        professor: 'Ana Beatriz', // Professora repetida em matéria diferente (coerente)
        description: 'Monitor(a) para reforço em raciocínio lógico, tabelas verdade, provas por indução e cálculo de predicados.',
        responsibilities: [
            'Ajudar na construção de provas formais.',
            'Corrigir exercícios de conjuntos e funções.',
            'Promover aulas de revisão antes das avaliações.',
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
            <MainHeader onMenuClick={toggleSidebar} />
            <main className={styles.feedMain}>
                <section className={styles.feedMain__box}>
                    <div className={styles.feedMain__header}>
                        <h1 className={styles.feedMain__materia}>Vagas Recentes</h1><img src={FilterIcon} alt="icone de filtro" className={styles['img-filter']} onClick={mostrarFiltros} />
                    </div>
                    <Filter
                        filtros={filters}
                        json={vagasDeExemplo}
                        mostrar={showFilters}
                        onSubmit={(valores) => filtrarPor(valores)}
                    />
                    {jobListOrdenada.map((vaga) => (
                        <JobCard
                            key={vaga.id}
                            id={vaga.id}
                            time={vaga.time}
                            state={vaga.state}
                            materia={vaga.materia}
                            professor={vaga.professor}
                            description={vaga.description}
                            responsibilities={vaga.responsibilities}
                            onClick={() => (vaga.state === 'open' ?  aplicar(vaga.id, vaga) : null )}
                            detalhes={{ id: vaga.id, vagaCompleta: vaga }}
                            conteudoBotao={vaga.state === 'open' ? "Me Candidatar!" : "Ver Detalhes"}
                        />
                    ))}

                </section>
            </main>
        </>
    )

}