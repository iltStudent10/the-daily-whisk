import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  children: ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <section className="card">
      {title ? <h2>{title}</h2> : null}
      {children}
    </section>
  )
}

export default Card