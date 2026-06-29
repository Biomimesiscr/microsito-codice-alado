
type Props = {
  colors: string[],
  size?: number
}

export default function ColorsDetail({ colors, size }: Props) {
  return (
    <div className="flex gap-2">
      {colors.map((color, index) => (
        <div key={index} style={{ backgroundColor: color, height: `${size || 40}px`, width: `${size || 40}px`, borderRadius: '50%' }} />
      ))}
    </div>
  )
}
