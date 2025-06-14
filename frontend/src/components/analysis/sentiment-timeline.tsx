import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts"

interface SentimentTimelineProps {
  data: Array<{
    time: number
    value: number
    topic: string
  }>
}

export default function SentimentTimeline({ data }: SentimentTimelineProps) {
  const getSentimentColor = (value: number) => {
    if (value >= 0.7) return "#22c55e" // green
    if (value >= 0.4) return "#f59e0b" // amber
    return "#ef4444" // red
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{`Tiempo: ${label} min`}</p>
          <p className="text-sm text-muted-foreground">{data.topic}</p>
          <p 
            className="font-medium"
            style={{ color: getSentimentColor(data.value) }}
          >
            {`Sentimiento: ${Math.round(data.value * 100)}%`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="time" 
          tick={{ fontSize: 12 }}
          label={{ value: 'Tiempo (min)', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          domain={[0, 1]}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `${Math.round(value * 100)}%`}
          label={{ value: 'Sentimiento', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
          fill="url(#colorGradient)"
          fillOpacity={0.3}
        />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  )
}

