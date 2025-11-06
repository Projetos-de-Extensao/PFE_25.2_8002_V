import PageHeader from "../../../components/Layout/PageHeader/PageHeader.jsx";
import Button from "../../../components/ui/Button/Button.jsx";

import styles from "./CreateAccountConfirmation.module.scss";

export default function CreateAccountConfirmation() {
  return (
    <>
      <PageHeader title="Cadastro" backTo="/login" />

      <main className={styles.confirm}>
        <section
          className={styles.confirm__card}
          role="status"
          aria-live="polite"
        >
          <div className={styles.confirm__icon} aria-hidden="true">
              <img src="src/assets/imgs/congratulations.png" alt="Cadastro concluído" />
          </div>

          <h1 className={styles.confirm__title}>Conta criada com sucesso!</h1>
          <p className={styles.confirm__text}>
            Tudo certo por aqui. Agora é só fazer login para começar a usar a
            plataforma.
          </p>

          <div className={styles.confirm__actions}>
            <Button as="a" href="/login" variant="primary">
              Ir para o login
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
