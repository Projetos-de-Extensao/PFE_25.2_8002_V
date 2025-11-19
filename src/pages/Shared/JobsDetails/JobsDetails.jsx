import PageHeader from "../../../components/Layout/PageHeader/PageHeader.jsx";
import Button from "../../../components/ui/Button/Button.jsx";
import Styles from "./JobsDetails.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

export default function JobsDetails() {
    const location = useLocation();
    // Acessa o objeto completo da vaga do state, com fallback seguro
    const vaga = location.state?.vagaCompleta;
    const navigate = useNavigate()

    function aplicar(id, vaga) {
        const path = `/aplication/${id}`
        navigate(path, { state: { vagaCompleta: vaga } })
    }

    if (!vaga) {
        return (
            <main className={Styles.errorContainer}>
                <PageHeader title="Erro" />
                <section className={Styles["main__detalhes"]}>
                    <h2>Detalhes da Vaga Não Encontrados</h2>
                    <p>
                        Não foi possível carregar os detalhes completos da vaga. Por favor, retorne ao feed.
                    </p>
                </section>
            </main>
        );
    }

    return (
        <>
            <PageHeader title={`${vaga.materia}`} />

            <main>

                <section className={Styles["main__detalhes"]}>
                    <div className={Styles["container__title"]}>
                        <h2>
                            {vaga.materia}
                        </h2>
                        <p>
                            {vaga.professor}
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
                                {vaga.responsibilities.map((element, index) => (
                                    <li key={index}>
                                        {element}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <Button size="medium" onClick={() => aplicar(vaga.id, vaga)}
                        >
                        Quero me candidatar!
                    </Button>

                </section>
            </main>
        </>
    );
}