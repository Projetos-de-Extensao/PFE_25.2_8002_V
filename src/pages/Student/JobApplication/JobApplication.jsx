import PageHeader from "../../../components/Layout/PageHeader/PageHeader.jsx";
import Button from "../../../components/ui/Button/Button.jsx";
import Input from "../../../components/ui/Input/Input.jsx";
import Textarea from "../../../components/ui/Textarea/Textarea.jsx";
import Styles from "./JobApplication.module.scss"
import { useLocation } from "react-router-dom";

export default function JobApplication() {
    const location = useLocation();
    const vaga = location.state?.vagaCompleta;
    return (
        <>
            <PageHeader title={`${vaga.materia}`} />

            <main className={Styles["main"]}>
                <form className={Styles["main__dados"]}>
                    <div className={Styles["container"]}>
                        <h2>
                            Dados Obrigatórios
                        </h2>

                        <Input
                            label="Nome e Sobrenome"
                            name="nomeCompleto"
                            placeholder="Digite seu nome completo"
                            type="text"
                        />

                        <Input
                            label="Matrícula"
                            name="matricula"
                            placeholder="Digite a sua matrícula"
                            type="text"
                        />

                        <Input
                            label="Disciplina"
                            name="disciplina"
                            placeholder="Matemática Discreta (Pré-Definida)"
                            type="text"
                        />

                        <Input
                            label="Data de Nascimento"
                            name="dataNascimento"
                            placeholder="dd/mm/aaaa"
                            type="date"
                        />

                        <Input
                            label="Nacionalidade"
                            name="nacionalidade"
                            placeholder="Ex: Brasileira"
                            type="text"
                        />

                        <Input
                            label="Histórico da Faculdade / CR (PDF)"
                            name="arquivoCR"
                            type="file"
                            accept="application/pdf" // Isso restringe a janela de seleção apenas para arquivos .pdf
                            placeholder="Selecione o arquivo PDF"
                        />

                        <Input
                            label="Curso"
                            name="curso"
                            placeholder="Ex: Ciência da Computação"
                            type="text"
                        />

                        <Input
                            label="Período"
                            name="periodo"
                            placeholder="Digite o número do seu período"
                            type="text"
                        />
                    </div>

                    <div className={Styles["container"]}>
                        <h2>
                            Qualificações Adicionais
                        </h2>

                        <Textarea
                            label="Por que você se acha um bom candidato para a vaga?"
                            name="habilidades"
                            placeholder="Digite os seus motivos, habilidades e como pode contribuir"
                        />

                        <Textarea
                            label="Experiências Relevantes"
                            name="experiencias"
                            placeholder="Projetos, outras monitorias etc"
                        />

                        <Textarea
                            label="Disponibilidade"
                            name="disponibilidade"
                            placeholder="Ex: Segundas e quartas à noite"
                        />

                        <Textarea
                            label="Links Úteis (LinkedIn, GitHub etc.)"
                            name="linksContato"
                            placeholder="https://linkedin.com/in/seu-perfil"
                        />
                    </div>

                    <Button>
                        Enviar
                    </Button>
                </form>
            </main>
        </>
    );
}