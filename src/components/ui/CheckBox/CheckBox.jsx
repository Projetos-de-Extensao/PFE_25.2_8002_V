import React from 'react'
import styles from '/home/caio/Documentos/Projetos/PFE_25.2_8002_V/src/components/ui/CheckBox/CheckBox.module.scss'

export default function CheckBox({name,label}) {
  return (
     <label>
         <input type="checkbox" id={name} name={name} className={styles['login__checkbox']} />
         {label}
    </label>
  )
}
