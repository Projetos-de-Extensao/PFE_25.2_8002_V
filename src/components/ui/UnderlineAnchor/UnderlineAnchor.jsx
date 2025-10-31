import React from 'react'
import styles from './UnderlineAnchor.module.scss'

export default function UnderlineAnchor({link,placeholder}) {
  return (
    <a href={link} className={styles['underline-anchor']}>{placeholder}</a>
  )
}
