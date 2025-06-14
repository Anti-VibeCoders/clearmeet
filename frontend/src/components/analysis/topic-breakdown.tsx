import { Clock, Smile, Meh, Frown } from "lucide-react"

interface TopicBreakdownProps {
  topics: Array<{
    id: number
    name: string
    time: string
    duration: string
    sentiment: number
  }>
}

export default function TopicBreakdown({ topics }: TopicBreakdownProps) {
  const getSentimentColor = (value: number) => {
    if (value >= 0.7) return "text-green-500 dark:text-green-400"
    if (value >= 0.4) return "text-amber-500 dark:text-amber-400"
    return "text-red-500 dark:text-red-400"
  }

  const getSentimentIcon = (value: number) => {
    if (value >= 0.7) return <Smile className="h-4 w-4" />
    if (value >= 0.4) return <Meh className="h-4 w-4" />
    return <Frown className="h-4 w-4" />
  }

  const getSentimentBg = (value: number) => {
    if (value >= 0.7) return "bg-green-500/10 border-green-500/20"
    if (value >= 0.4) return "bg-amber-500/10 border-amber-500/20"
    return "bg-red-500/10 border-red-500/20"
  }

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className={`p-4 rounded-lg border ${getSentimentBg(topic.sentiment)} transition-all duration-200 hover:shadow-md`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{topic.name}</h3>
                <span className={`flex items-center gap-1 ${getSentimentColor(topic.sentiment)}`}>
                  {getSentimentIcon(topic.sentiment)}
                  <span className="text-sm font-medium">
                    {Math.round(topic.sentiment * 100)}%
                  </span>
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Inicio: {topic.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Duración: {topic.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 ml-4">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${topic.sentiment * 100}%`,
                    backgroundColor: topic.sentiment >= 0.7 ? '#22c55e' : 
                                   topic.sentiment >= 0.4 ? '#f59e0b' : '#ef4444'
                  }}
                />
              </div>
              <div className="text-xs text-center mt-1 text-muted-foreground">
                Sentimiento
              </div>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Tema #{topic.id} de {topics.length}
              </span>
              <span className={`font-medium ${getSentimentColor(topic.sentiment)}`}>
                {topic.sentiment >= 0.7 ? 'Positivo' : 
                 topic.sentiment >= 0.4 ? 'Neutral' : 'Negativo'}
              </span>
            </div>
          </div>
        </div>
      ))}
      
      {/* Resumen */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h3 className="font-semibold mb-3">Resumen de temas</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-500">
              {topics.filter(t => t.sentiment >= 0.7).length}
            </div>
            <div className="text-sm text-muted-foreground">Temas positivos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-500">
              {topics.filter(t => t.sentiment >= 0.4 && t.sentiment < 0.7).length}
            </div>
            <div className="text-sm text-muted-foreground">Temas neutrales</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-500">
              {topics.filter(t => t.sentiment < 0.4).length}
            </div>
            <div className="text-sm text-muted-foreground">Temas negativos</div>
          </div>
        </div>
      </div>
    </div>
  )
}

