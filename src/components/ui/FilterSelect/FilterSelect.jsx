import React, { useEffect, useState } from "react";
import styles from "./FilterSelect.module.scss";

export default function FilterSelect({ label, options, value, onChange }) {
  const [internalOptions, setInternalOptions] = useState([]);

  useEffect(() => {
    setInternalOptions([...new Set(options)]);
  }, [options]);

  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className={styles["select"]}
    >
      <option value="">{label ? `Selecione ${label}` : "Selecione"}</option>
      {internalOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
