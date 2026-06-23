interface Props {
  prefix: string
  bold: string
}

export function TitleBlock({ prefix, bold }: Props) {
  return (
    <h2 className="whitespace-nowrap text-center text-3xl tracking-wide text-gray-900">
      <span className="font-light">{prefix}</span>
      <span className="font-bold">{bold}</span>
    </h2>
  )
}
