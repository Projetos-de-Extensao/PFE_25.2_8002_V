// 1. ADICIONE ESTA IMPORTAÇÃO AQUI NO TOPO
import { useState, useEffect } from 'react'; 

import PageHeader from "../../../components/Layout/PageHeader/PageHeader.jsx";
import Button from "../../../components/ui/Button/Button.jsx";
import Styles from "./CreateJobs.module.scss";
import Select from "../../../components/ui/Select/Select.jsx";
import Textarea from "../../../components/ui/Textarea/Textarea.jsx";

export default function CreateJobs() {
    // 2. CRIE O ESTADO (VARIÁVEL) AQUI
    const [listaDisciplinas, setListaDisciplinas] = useState([]);

    useEffect(() => {
        fetch('/db.json') 
            .then((response) => response.json())
            .then((data) => {
                const todasMaterias = data.map(vaga => vaga.materia);
                const materiasUnicas = [...new Set(todasMaterias)];
                materiasUnicas.sort();
                
                // Salva na variável que criamos ali em cima
                setListaDisciplinas(materiasUnicas);
            })
            .catch(error => console.error("Erro ao carregar disciplinas:", error));
    }, []);

    return (
        <>
            <PageHeader title="Nova Vaga" />

            <main>
                <section className={Styles["main__criacao"]}>
                    <Select
                        label="Disciplina"
                        name="disciplina"
                        placeholder="Selecione uma opção"
                        // 3. USE O NOME CORRETO DA VARIÁVEL DE ESTADO AQUI
                        options={listaDisciplinas} 
                    />

                    <Textarea
                        label={"Requisitos"} // Corrigi um typo aqui ("Resquisitos")
                        name={"requisitos"}
                        placeholder={"Digite os requisitos aqui"}
                    />

                    <Textarea
                        label={"Responsabilidades"}
                        name={"responsabilidades"}
                        placeholder={"Defina as responsabilidades aqui"}
                    />

                    <Button>
                        Criar vaga
                    </Button>

                </section>
            </main>
        </>
    );
}