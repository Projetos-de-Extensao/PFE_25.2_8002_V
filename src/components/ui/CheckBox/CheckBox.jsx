import React from 'react'
import styles from './CheckBox.module.scss'

export default function CheckBox({name,label}) {
  return (
     <label className={styles.label}>
         <input type="checkbox" id={name} name={name} className={styles['login__checkbox']} />
         {label}
    </label>
  )
}
