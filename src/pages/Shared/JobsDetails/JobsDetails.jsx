import PageHeader from "../../../components/Layout/PageHeader";
import Button from "../../../components/ui/Button";
import Styles from "./JobsDetails.module.scss";

export default function JobsDetails() {
    return (
        <>
            <PageHeader title="Vaga de Monitoria" />

            <main>
                <section className={Styles["main__detalhes"]}>
                    <div className={Styles["container__title"]}>
                        <h2>
                            Programação Estruturada
                        </h2>
                        <p>
                            Prof Cassius Moreira
                        </p>
                    </div>

                    <div className={Styles["container__detalhes"]}>
                        <div className={Styles["container__requisitos"]}>
                            <h3>
                                Requisitos
                            </h3>
                            <ul className={Styles["lista__requisitos"]}>
                                <li>
                                    Estar cursando cursos Tech ou Engenharia da Computação
                                </li>
                                <li>
                                    Ter sido aprovado na matéria com, no mínimo, 9 (nove) de média final
                                </li>
                                <li>
                                    Ser curioso e esforçado
                                </li>
                                <li>
                                    Ser atento e disponível
                                </li>
                            </ul>
                        </div>

                        <div className={Styles["container__responsabilidades"]}>
                            <h3>
                                Responsabilidades
                            </h3>
                            <ul className={Styles["lista__responsabilidades"]}>
                                <li>
                                    Tirar dúvidas sobre variáveis, controle de fluxo, funções, vetores e matrizes
                                </li>
                                <li>
                                    Apoiar exercícios práticos e projetos curtos em C (ou linguagem equivalente)
                                </li>
                                <li>
                                    Corrigir listas e dar feedback objetivo
                                </li>
                                <li>
                                    Acompanhar fóruns e registrar dificulades recorrentes
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Button>
                        Quero me candidatar!
                    </Button>

                </section>
            </main>
        </>
    );
}