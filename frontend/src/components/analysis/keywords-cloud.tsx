interface KeywordsCloudProps {
  keywords: Array<{
    text: string
    value: number
  }>
}

export default function KeywordsCloud({ keywords }: KeywordsCloudProps) {
  const getSize = (value: number) => {
    const max = Math.max(...keywords.map(k => k.value))
    const min = Math.min(...keywords.map(k => k.value))
    const normalizedValue = (value - min) / (max - min)
    return 12 + normalizedValue * 24 // Entre 12px y 36px
  }

  const getColor = (value: number) => {
    const max = Math.max(...keywords.map(k => k.value))
    const intensity = value / max
    return `hsl(${220 + intensity * 60}, ${60 + intensity * 30}%, ${40 + intensity * 20}%)`
  }

  return (
    <div className="w-full h-full flex flex-wrap items-center justify-center gap-2 p-4">
      {keywords.map((keyword, index) => (
        <span
          key={index}
          className="inline-block px-2 py-1 rounded-md font-medium transition-transform hover:scale-110 cursor-pointer"
          style={{
            fontSize: `${getSize(keyword.value)}px`,
            color: getColor(keyword.value),
            backgroundColor: `${getColor(keyword.value)}15`,
          }}
          title={`Frecuencia: ${keyword.value}`}
        >
          {keyword.text}
        </span>
      ))}
    </div>
  )
}

