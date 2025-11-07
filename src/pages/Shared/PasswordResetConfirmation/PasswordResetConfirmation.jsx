import PageHeader from "../../../components/Layout/PageHeader/PageHeader.jsx";
import Button from "../../../components/ui/Button/Button.jsx";
import { useNavigate } from "react-router-dom";

import styles from "./PasswordResetConfirmation.module.scss";

export default function PasswordResetConfirmation() {
  return (
    <>
      <PageHeader title="" backTo="/login" />

      <main className={styles.resetconfirm}>
        <section
          className={styles.resetconfirm__card}
          role="status"
          aria-live="polite"
        >
          <div className={styles.resetconfirm__icon} aria-hidden="true">
              <img src="src/assets/imgs/congratulations.png" alt="Cadastro concluído" />
          </div>

          <h1 className={styles.resetconfirm__title}>Solicitação Efetuada!</h1>
          <p className={styles.resetconfirm__text}>
            Em alguns instantes receberá um email para que possa proseguir com a redefinição de sua senha.
          </p>

          <div className={styles.resetconfirm__actions}>
            <Button as="a" href="/login" variant="primary" onClick={useNavigate('/login')}>
              Reenviar Email
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
