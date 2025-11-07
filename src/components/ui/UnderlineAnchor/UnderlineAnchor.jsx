import React from 'react'
import styles from './UnderlineAnchor.module.scss'
import { Link } from 'react-router-dom'

export default function UnderlineAnchor({link,placeholder}) {
  return (
    <Link className={styles['underline-anchor']} to={link}>{placeholder}</Link>
  )
}
 