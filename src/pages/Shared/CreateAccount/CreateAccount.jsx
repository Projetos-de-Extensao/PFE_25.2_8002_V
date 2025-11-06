import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader/PageHeader.jsx";
import Button from "../components/ui/Button/Button.jsx";

import './CreateAccount.module.scss';

const ROLE_BY_DOMAIN = {
  "aluno.ibmec.edu.br": "Aluno",
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

  // bounds de data (hoje e hoje - 100y)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const maxDate = `${yyyy}-${mm}-${dd}`;
  const minDate = `${yyyy - 100}-${mm}-${dd}`;

  function handleChange(e) {
    const { name, value, files } = e.target;
    const next = { ...form, [name]: files ? files[0] : value };
    setForm(next);

    if (name === "email") {
      const domain = value.toLowerCase().trim().split("@")[1] || "";
      setPerfilDetectado(ROLE_BY_DOMAIN[domain] || "—");
    }
  }

  function validateBasic() {
    const errs = {};

    // nome
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/.test(form.nome.trim())) {
      errs.nome = ERR.nome;
    }

    // email
    const email = form.email.trim().toLowerCase();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const domain = email.split("@")[1] || "";
    const domainOk = Object.keys(ROLE_BY_DOMAIN).includes(domain);
    if (!emailOk || !domainOk) {
      errs.email = ERR.email;
    }

    // senha
    const senha = form.senha;
    const senhaOk =
      /(?=.*[A-Z])/.test(senha) &&
      /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(senha) &&
      senha.length >= 8;
    if (!senhaOk) errs.senha = ERR.senha;

    // nascimento
    if (!form.nascimento) {
      errs.nascimento = ERR.nascimento;
    } else {
      const dt = new Date(form.nascimento + "T00:00:00");
      const now = new Date();
      const min = new Date(now);
      min.setFullYear(now.getFullYear() - 100);
      if (dt > now || dt < min) errs.nascimento = ERR.nascimento;
    }

    // matricula
    if (!/^[0-9]+$/.test(form.matricula.trim())) {
      errs.matricula = ERR.matricula;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateImage(file) {
    return new Promise((resolve) => {
      if (!file)
        return resolve({ ok: false, msg: ERR.foto_tipo });

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
        if (w < 250 || h < 250)
          return resolve({ ok: false, msg: ERR.foto_dim });
        const ratio = w / h;
        const target = 4 / 3;
        const tol = 0.03;
        if (Math.abs(ratio - target) > tol)
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

    // Aqui você faria seu POST real (fetch/axios).
    // Se sucesso:
    navigate("/cadastro-confirmado", { replace: true });
  }

  return (
    <>
      {/* Header do seu design system (opcional aqui) */}
      <PageHeader title="Cadastro" backTo="/login" />

      <main className="cadastro">
        <section className="cadastro__card">
          <form className="cadastro__form" onSubmit={handleSubmit} noValidate>
            <div className="cadastro__alert" aria-live="polite">{alertMsg}</div>

            {/* Nome */}
            <div className="input-box">
              <label htmlFor="nome" className="input-box__label">Nome completo</label>
              <input
                id="nome"
                name="nome"
                className="input-box__input"
                type="text"
                placeholder="Seu nome completo"
                value={form.nome}
                onChange={handleChange}
                required
              />
              <small className="cadastro__error">{errors.nome}</small>
            </div>

            {/* Email */}
            <div className="input-box">
              <label htmlFor="email" className="input-box__label">Email institucional</label>
              <input
                id="email"
                name="email"
                className="input-box__input"
                type="email"
                inputMode="email"
                placeholder="seu.email@aluno.ibmec.edu.br"
                value={form.email}
                onChange={handleChange}
                required
              />
              <small className="cadastro__error">{errors.email}</small>
            </div>

            {/* Senha */}
            <div className="input-box">
              <label htmlFor="senha" className="input-box__label">Senha</label>
              <input
                id="senha"
                name="senha"
                className="input-box__input"
                type="password"
                placeholder="Mín. 8 caracteres, 1 maiúscula e 1 caractere especial"
                value={form.senha}
                onChange={handleChange}
                required
              />
              <small className="cadastro__error">{errors.senha}</small>
            </div>

            {/* Nascimento */}
            <div className="input-box">
              <label htmlFor="nascimento" className="input-box__label">Data de nascimento</label>
              <input
                id="nascimento"
                name="nascimento"
                className="input-box__input"
                type="date"
                value={form.nascimento}
                onChange={handleChange}
                min={minDate}
                max={maxDate}
                required
              />
              <small className="cadastro__error">{errors.nascimento}</small>
            </div>

            {/* Matrícula */}
            <div className="input-box">
              <label htmlFor="matricula" className="input-box__label">Matrícula</label>
              <input
                id="matricula"
                name="matricula"
                className="input-box__input"
                type="text"
                inputMode="numeric"
                placeholder="Somente números"
                value={form.matricula}
                onChange={handleChange}
                required
              />
              <small className="cadastro__error">{errors.matricula}</small>
            </div>

            {/* Foto */}
            <div className="input-box">
              <label htmlFor="foto" className="input-box__label">Foto de perfil (JPG, PNG, WEBP)</label>
              <input
                id="foto"
                name="foto"
                className="input-box__input"
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleChange}
                required
              />
              <small className="cadastro__hint">
                Proporção 4:3, mínimo 250×250 px, até 5 MB.
              </small>
              <small className="cadastro__error">{errors.foto}</small>
            </div>

            {/* Perfil detectado */}
            <div className="input-box">
              <label className="input-box__label">Perfil detectado</label>
              <input
                className="input-box__input"
                type="text"
                value={perfilDetectado}
                readOnly
              />
            </div>

            {/* Ações */}
            <div className="cadastro__actions">
              <Button type="submit" variant="primary">Criar conta</Button>
              <Button as="a" href="/login" variant="alternative">Já tenho conta</Button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
