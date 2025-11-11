import React, { useState, useMemo } from "react";
import styles from './Filter.module.scss'
import FilterSelect from "../FilterSelect/FilterSelect.jsx";
import Button from "../Button/Button.jsx";

export default function Filter({ filtros, json, mostrar, onSubmit }) {
  const [valores, setValores] = useState({});

  function handleFilterChange(chave, valor) {
  setValores((prev) => ({
    ...prev,        // mantém os filtros anteriores
    [chave]: valor, // atualiza só o que mudou
  }));
}

  const dadosFiltrados = useMemo(() => {
  return json.filter((item) =>
    Object.entries(valores).every(([chave, valor]) => {
      if (!valor) return true; // ignora filtros vazios
      const itemValor = String(item[chave] || "").toLowerCase();
      const filtroValor = String(valor).toLowerCase();
      return itemValor.includes(filtroValor);
    })
  );
}, [json, valores]);

  function getOpcoes(chave) {
    const dadosFiltradosLocal = json.filter((item) =>
      filtros.every((outro) =>
        outro === chave || !valores[outro] || item[outro] === valores[outro]
      )
    );

    return [...new Set(dadosFiltradosLocal.map((i) => i[chave]))];
  }

  return (
    <form
      className={mostrar ? styles['filter-form'] : styles['hidden']}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(valores); // <- envia os valores certos
      }}
    >
      <div className={styles['filter-form__filters']}>
        {filtros.map((chave) => (
  <FilterSelect
    key={chave + JSON.stringify(valores)} // força o React a recriar o select se algum valor mudar
    label={chave.charAt(0).toUpperCase() + chave.slice(1)}
    options={getOpcoes(chave)}
    value={valores[chave] || ""}
    onChange={(valor) => handleFilterChange(chave, valor)}
  />
))}
      </div>
      <Button children="Filtrar" type="submit" />
    </form>
  );
}
