import PageHeader from "../../../components/Layout/PageHeader/PageHeader.jsx";
import Button from "../../../components/ui/Button/Button.jsx";
import { useNavigate } from "react-router-dom";

import styles from "./CreateAccountConfirmation.module.scss";

export default function CreateAccountConfirmation() {
  const navigate = useNavigate();
  
  
  return (
    <>
      <PageHeader title="" backTo="/login" />

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
            Tudo certo por aqui, agora é só fazer login para começar a usar a
            plataforma.
          </p>

          <div className={styles.confirm__actions}>
            <Button href="/login" variant="primary" onClick={() => navigate('/')}>
              Ir para o login
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
