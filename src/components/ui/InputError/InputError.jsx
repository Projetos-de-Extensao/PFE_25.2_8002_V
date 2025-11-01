import React from 'react'
import Styles from './InputError.module.scss';

export default function InputError({message,name,visibility}) {
    const classe = `${Styles['input-error']} ${Styles[visibility]}`;

  return (
    <div className={classe} name={name}>
        <span className={classe}>
            *{message}
        </span>
    </div>
  )
}
