import { useState } from "react"
import { Search, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TranscriptEntry {
  time: string
  speaker: string
  text: string
}

interface TranscriptViewerProps {
  transcript: TranscriptEntry[]
}

export default function TranscriptViewer({ transcript }: TranscriptViewerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpeaker, setSelectedSpeaker] = useState<string | null>(null)

  const speakers = Array.from(new Set(transcript.map(entry => entry.speaker)))

  const filteredTranscript = transcript.filter(entry => {
    const matchesSearch = searchTerm === "" || 
      entry.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.speaker.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSpeaker = selectedSpeaker === null || entry.speaker === selectedSpeaker
    
    return matchesSearch && matchesSpeaker
  })

  const getSpeakerColor = (speaker: string) => {
    const colors = [
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300", 
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    ]
    const index = speakers.indexOf(speaker) % colors.length
    return colors[index]
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar en la transcripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedSpeaker === null ? "default" : "outline"}
            size="sm"
            className="cursor-pointer"
            onClick={() => setSelectedSpeaker(null)}
          >
            Todos
          </Button>
          {speakers.map(speaker => (
            <Button
              key={speaker}
              variant={selectedSpeaker === speaker ? "default" : "outline"}
              size="sm"
              className="cursor-pointer"
              onClick={() => setSelectedSpeaker(speaker === selectedSpeaker ? null : speaker)}
            >
              {speaker.split(' ')[0]}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>Mostrando {filteredTranscript.length} de {transcript.length} entradas</span>
        {searchTerm && (
          <span>• Buscando: "{searchTerm}"</span>
        )}
        {selectedSpeaker && (
          <span>• Filtrado por: {selectedSpeaker}</span>
        )}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredTranscript.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No se encontraron resultados para los filtros aplicados.
          </div>
        ) : (
          filteredTranscript.map((entry, index) => (
            <div key={index} className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-shrink-0 flex items-center gap-1 text-sm text-muted-foreground min-w-[60px]">
                <Clock className="h-3 w-3" />
                <span className="font-mono">{entry.time}</span>
              </div>
              
              <div className="flex-shrink-0">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getSpeakerColor(entry.speaker)}`}>
                  <User className="h-3 w-3" />
                  {entry.speaker}
                </span>
              </div>
              
              <div className="flex-grow">
                <p className="text-sm leading-relaxed">
                  {searchTerm ? (
                    entry.text.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, i) => 
                      part.toLowerCase() === searchTerm.toLowerCase() ? (
                        <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
                          {part}
                        </mark>
                      ) : (
                        part
                      )
                    )
                  ) : (
                    entry.text
                  )}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h3 className="font-semibold mb-3">Participación por speaker</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {speakers.map(speaker => {
            const count = transcript.filter(entry => entry.speaker === speaker).length
            const percentage = ((count / transcript.length) * 100).toFixed(1)
            return (
              <div key={speaker} className="text-center">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-1 ${getSpeakerColor(speaker)}`}>
                  {speaker.split(' ')[0]}
                </div>
                <div className="text-lg font-bold">{count}</div>
                <div className="text-xs text-muted-foreground">{percentage}%</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}