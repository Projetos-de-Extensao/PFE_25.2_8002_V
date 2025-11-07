import React from 'react'
import styles from './UnderlineAnchor.module.scss'

export default function UnderlineAnchor({link,placeholder}) {
  return (
    <Link href={link} className={styles['underline-anchor']}>{placeholder}</Link>
  )
}
 