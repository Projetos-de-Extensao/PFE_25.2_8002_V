import PageHeader from "../../../components/Layout/PageHeader/PageHeader.jsx";
import Button from "../../../components/ui/Button/Button.jsx";
import Styles from "./CreateJobs.module.scss";
// import Select from "../../../components/ui/Select/Select.jsx";
import Textarea from "../../../components/ui/Textarea/Textarea.jsx";

export default function CreateJobs() {
    return (
        <>
            <PageHeader title="Nova Vaga" />

            <main>
                <section className={Styles["main__criacao"]}>
                    <Select />

                    <Textarea
                        label={"Resquisitos"}
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