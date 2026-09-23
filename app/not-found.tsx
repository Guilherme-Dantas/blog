import Link from "next/link"

export default function NotFound() {
  return (
    <div className="missing">
      <h1>Essa nota não está aqui.</h1>
      <p>
        O endereço não existe, ou a nota ainda é rascunho. <Link href="/">Voltar para as notas.</Link>
      </p>
    </div>
  )
}
