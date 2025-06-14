import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts"
import { Smile, Meh, Frown } from "lucide-react"

interface ParticipantAnalysisProps {
  participants: Array<{
    id: number
    name: string
    role: string
    speakingTime: number
    sentiment: number
  }>
}

export default function ParticipantAnalysis({ participants }: ParticipantAnalysisProps) {
  const getSentimentColor = (value: number) => {
    if (value >= 0.7) return "#22c55e" // green
    if (value >= 0.4) return "#f59e0b" // amber
    return "#ef4444" // red
  }

  const getSentimentIcon = (value: number) => {
    if (value >= 0.7) return <Smile className="h-4 w-4" />
    if (value >= 0.4) return <Meh className="h-4 w-4" />
    return <Frown className="h-4 w-4" />
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">{data.role}</p>
          <p className="font-medium">{`Tiempo: ${data.speakingTime} min`}</p>
          <p 
            className="font-medium flex items-center gap-1"
            style={{ color: getSentimentColor(data.sentiment) }}
          >
            <span>Sentimiento: {Math.round(data.sentiment * 100)}%</span>
            {getSentimentIcon(data.sentiment)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Gráfico de tiempo de participación */}
      <div className="h-64">
        <h3 className="text-lg font-semibold mb-4">Tiempo de participación</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={participants}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              label={{ value: 'Minutos', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="speakingTime" radius={[4, 4, 0, 0]}>
              {participants.map((participant, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getSentimentColor(participant.sentiment)} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Lista detallada de participantes */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Análisis detallado</h3>
        <div className="grid gap-4">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{participant.name}</h4>
                  <span className="text-sm text-muted-foreground">({participant.role})</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm">Tiempo: {participant.speakingTime} min</span>
                  <div className="flex items-center gap-1">
                    <span 
                      className="text-sm font-medium"
                      style={{ color: getSentimentColor(participant.sentiment) }}
                    >
                      {Math.round(participant.sentiment * 100)}%
                    </span>
                    <span style={{ color: getSentimentColor(participant.sentiment) }}>
                      {getSentimentIcon(participant.sentiment)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-32">
                <div className="bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${(participant.speakingTime / Math.max(...participants.map(p => p.speakingTime))) * 100}%`,
                      backgroundColor: getSentimentColor(participant.sentiment)
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

