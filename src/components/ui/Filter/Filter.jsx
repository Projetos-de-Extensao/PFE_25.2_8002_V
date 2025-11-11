import React from 'react'
import styles from './Filter.module.scss'

export default function Filter({filtros,json}) {
  return (
  <div>
    <form>
      {filtros.map((filtro) => (
        <select key={filtro} name={filtro} id={filtro}>
            {json.map((obj)=> (
                <option key={obj[filtro]} value={obj[filtro]}>{obj[filtro]}</option>

            ))}
        </select>
      ))}
    </form>
  </div>
  )
}