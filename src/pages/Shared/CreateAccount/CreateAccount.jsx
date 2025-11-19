import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/Layout/PageHeader/PageHeader.jsx";
import Button from "../../../components/ui/Button/Button.jsx";
import Input from "../../../components/ui/Input/Input.jsx";
import styles from "./CreateAccount.module.scss";

const ROLE_BY_DOMAIN = {
  "alunos.ibmec.edu.br": "Aluno",
  "aluno.ibmec.edu.br": "Aluno",
  "professores.ibmec.edu.br": "Professor",
  "prof.ibmec.edu.br": "Professor",
  "ibmec.edu.br": "Coordenação",
};

const ERR = {
  nome: "Use apenas letras e espaços (mín. 2 caracteres).",
  email: "Informe um email institucional válido do IBMEC.",
  senha: "Mínimo 8 caracteres, com 1 letra maiúscula e 1 caractere especial.",
  nascimento:
    "Data inválida. Não pode ser futura e a idade não pode exceder 100 anos.",
  matricula: "A matrícula deve conter apenas números.",
  foto_tipo: "Formato inválido. Use JPG, PNG ou WEBP.",
  foto_tamanho: "A imagem deve ter no máximo 5 MB.",
  foto_dim: "Dimensões mínimas de 250×250 px.",
  foto_ratio: "A imagem deve ter proporção 4:3 (largura:altura).",
};

/* helpers mínimos para data */
function parseDateFlexible(v) {
  if (!v) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
    const [y, m, d] = v.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(v)) {
    const [d, m, y] = v.split("/").map(Number);
    return new Date(y, m - 1, d);
  }
  return null;
}
function isValidBirthDateStr(v) {
  const dt = parseDateFlexible(v);
  if (!dt || Number.isNaN(dt.getTime())) return false;
  const now = new Date();
  const min = new Date(now);
  min.setFullYear(now.getFullYear() - 100);
  return !(dt > now || dt < min);
}

export default function CreateAccount() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    nascimento: "",
    matricula: "",
    foto: null,
  });

  const [perfilDetectado, setPerfilDetectado] = useState("—");
  const [errors, setErrors] = useState({});
  const [alertMsg, setAlertMsg] = useState("");

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const maxDate = `${yyyy}-${mm}-${dd}`;
  const minDate = `${yyyy - 100}-${mm}-${dd}`;

  function handleChange(arg1, fieldName) {
    // Caso 1: nativo/sem wrapper → event
    if (arg1 && arg1.target) {
      const { name, value, files, type } = arg1.target;
      const key = name || fieldName;
      const val = type === "file" ? (files ? files[0] : null) : value;
      setForm((prev) => ({ ...prev, [key]: val }));

      if (key === "email") {
        const domain = String(val || "").toLowerCase().trim().split("@")[1] || "";
        setPerfilDetectado(ROLE_BY_DOMAIN[domain] || "—");
      }
      return;
    }

    // Caso 2: wrapper → onValueChange(value[, name])
    const value = arg1;
    const key = fieldName || ""; // caso você passe o name pelo segundo arg
    if (!key) return;            // sem key, não dá pra setar

    setForm((prev) => ({ ...prev, [key]: value }));

    if (key === "email") {
      const domain = String(value || "").toLowerCase().trim().split("@")[1] || "";
      setPerfilDetectado(ROLE_BY_DOMAIN[domain] || "—");
    }
  }


  function validateBasic() {
    const errs = {};

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/.test(form.nome.trim())) {
      errs.nome = ERR.nome;
    }

    const email = form.email.trim().toLowerCase();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const domain = email.split("@")[1] || "";
    const domainOk = Object.prototype.hasOwnProperty.call(ROLE_BY_DOMAIN, domain);
    if (!emailOk || !domainOk) {
      errs.email = ERR.email;
    }

    const senha = form.senha;
    const senhaOk =
      /(?=.*[A-Z])/.test(senha) &&
      /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(senha) &&
      senha.length >= 8;
    if (!senhaOk) errs.senha = ERR.senha;

    if (!isValidBirthDateStr(form.nascimento)) {
      errs.nascimento = ERR.nascimento;
    }

    if (!/^[0-9]+$/.test(form.matricula.trim())) {
      errs.matricula = ERR.matricula;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateImage(file) {
    return new Promise((resolve) => {
      if (!file) return resolve({ ok: false, msg: ERR.foto_tipo });

      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type))
        return resolve({ ok: false, msg: ERR.foto_tipo });
      if (file.size > 5 * 1024 * 1024)
        return resolve({ ok: false, msg: ERR.foto_tamanho });

      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        if (w < 250 || h < 250) return resolve({ ok: false, msg: ERR.foto_dim });
        const ratio = w / h;
        if (Math.abs(ratio - 4 / 3) > 0.03)
          return resolve({ ok: false, msg: ERR.foto_ratio });
        resolve({ ok: true });
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve({ ok: false, msg: ERR.foto_tipo });
      };
      img.src = url;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setAlertMsg("");
    setErrors({});

    const ok = validateBasic();
    let imgOk = false, imgMsg = "";
    if (form.foto) {
      const res = await validateImage(form.foto);
      imgOk = res.ok;
      imgMsg = res.msg;
    } else {
      imgMsg = ERR.foto_tipo;
    }
    if (!imgOk) setErrors((prev) => ({ ...prev, foto: imgMsg }));

    if (!(ok && imgOk)) {
      setAlertMsg("Corrija os campos destacados e tente novamente.");
      return;
    }

    navigate("/createaccountconfirmation", { replace: true });
  }

  return (
    <>
      <main className={styles.cadastro}>
        <div className={styles.brand}>
          <img src="src/assets/imgs/Ibvagas.png" alt="IBvagas" className={styles.brand__img} />
        </div>

        <section className={styles.cadastro__card}>
          <form className={styles.cadastro__form} onSubmit={handleSubmit} noValidate>
            <div className={styles.cadastro__alert} aria-live="polite">
              {alertMsg}
            </div>

            {/* Nome */}
            <div className="input-box">
              <label htmlFor="nome" className="input-box__label">Nome completo</label>
              <Input
                id="nome"
                name="nome"
                className="input-box__input"
                type="text"
                placeholder="Seu nome completo"
                value={form.nome}
                onChange={(e) => handleChange(e, "nome")}
                onValueChange={(v) => handleChange(v, "nome")}
                required
              />
              <small className={styles.cadastro__error}>{errors.nome}</small>
            </div>

            {/* Email */}
            <div className="input-box">
              <label htmlFor="email" className="input-box__label">Email institucional</label>
              <Input
                id="email"
                name="email"
                className="input-box__input"
                type="email"
                inputMode="email"
                placeholder="seu.email@alunos.ibmec.edu.br"
                value={form.email}
                onChange={(e) => handleChange(e, "email")}
                onValueChange={(v) => handleChange(v, "email")}
                required
              />
              <small className={styles.cadastro__error}>{errors.email}</small>
            </div>

            {/* Senha */}
            <div className="input-box">
              <label htmlFor="senha" className="input-box__label">Senha</label>
              <Input
                id="senha"
                name="senha"
                className="input-box__input"
                type="password"
                placeholder="Mín. 8 caracteres, 1 maiúscula e 1 caractere especial"
                value={form.senha}
                onChange={(e) => handleChange(e, "senha")}
                onValueChange={(v) => handleChange(v, "senha")}
                required
              />
              <small className={styles.cadastro__error}>{errors.senha}</small>
            </div>

            {/* Data de nascimento */}
            <div className="input-box">
              <label htmlFor="nascimento" className="input-box__label">Data de nascimento</label>
              <Input
                id="nascimento"
                name="nascimento"
                className="input-box__input"
                type="date"
                value={form.nascimento}
                onChange={(e) => handleChange(e, "nascimento")}
                onValueChange={(v) => handleChange(v, "nascimento")}
                min={minDate}
                max={maxDate}
                required
              />
              <small className={styles.cadastro__error}>{errors.nascimento}</small>
            </div>

            {/* Matrícula */}
            <div className="input-box">
              <label htmlFor="matricula" className="input-box__label">Matrícula</label>
              <Input
                id="matricula"
                name="matricula"
                className="input-box__input"
                type="text"
                inputMode="numeric"
                placeholder="Somente números"
                value={form.matricula}
                onChange={(e) => handleChange(e, "matricula")}
                onValueChange={(v) => handleChange(v, "matricula")}
                required
              />
              <small className={styles.cadastro__error}>{errors.matricula}</small>
            </div>


            {/* Foto (usa event por causa do files) */}
            <div className="input-box">
              <label htmlFor="foto" className="input-box__label">Foto de perfil (JPG, PNG, WEBP)</label>
              <Input
                id="foto"
                name="foto"
                className="input-box__input"
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) => handleChange(e, "foto")}
                required
              />
              <small className={styles.cadastro__hint}>
                Proporção 4:3, mínimo 250×250 px, até 5 MB.
              </small>
              <small className={styles.cadastro__error}>{errors.foto}</small>
            </div>

            <div className={styles.cadastro__actions}>
              {/* Navigate apenas para fim de apresentação*/}
              <Button type="submit" variant="primary" onClick={() => navigate('/createaccountconfirmation')}>Criar conta</Button>
              <Button as="a" href="/login" variant="alternative" onClick={() => navigate('/')}>Já tenho conta</Button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
