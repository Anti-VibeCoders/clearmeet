import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { motion } from "framer-motion"
import {
    Clock,
    Users,
    MessageSquare,
    TrendingUp,
    Download,
    Share2,
    ChevronDown,
    ChevronUp,
    Smile,
    Meh,
    Frown,
    Volume2,
    FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

import SentimentTimeline from "@/components/analysis/sentiment-timeline"
import KeywordsCloud from "@/components/analysis/keywords-cloud"
import ParticipantAnalysis from "@/components/analysis/participant-analysis"
import TopicBreakdown from "@/components/analysis/topic-breakdown"
import TranscriptViewer from "@/components/analysis/transcript-viewer"
import useShare from '@/hooks/useShare'
import * as XLSX from 'xlsx';

function Results() {
    const { id } = useParams<{ id: string }>()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<any>(null)
    const [activeSection, setActiveSection] = useState<string | null>(null)

    const { share, isSharing } = useShare();

    function exportToExcel() {
        if (!data) return;

        const wb = XLSX.utils.book_new();

        // --- Estilos --- 
        const headerStyle = {
            fill: { fgColor: { rgb: "FFD9EAD3" } }, // Verde claro
            font: { bold: true, color: { rgb: "FF006400" } }, // Verde oscuro
            alignment: { horizontal: "center", vertical: "center" },
            border: {
                top: { style: "thin", color: { rgb: "FF7F7F7F" } },
                bottom: { style: "thin", color: { rgb: "FF7F7F7F" } },
                left: { style: "thin", color: { rgb: "FF7F7F7F" } },
                right: { style: "thin", color: { rgb: "FF7F7F7F" } },
            }
        };
        const dataStyle = {
            fill: { fgColor: { rgb: "FFFFFFFF" } }, // Blanco
            border: {
                top: { style: "thin", color: { rgb: "FFBFBFBF" } },
                bottom: { style: "thin", color: { rgb: "FFBFBFBF" } },
                left: { style: "thin", color: { rgb: "FFBFBFBF" } },
                right: { style: "thin", color: { rgb: "FFBFBFBF" } },
            }
        };
        const sentimentColors = {
            Positivo: { fgColor: { rgb: "FFC6EFCE" } }, // Verde muy claro
            Neutral: { fgColor: { rgb: "FFFFF9C4" } },  // Amarillo muy claro
            Negativo: { fgColor: { rgb: "FFFFCDD2" } }, // Rojo muy claro
        };


        // --- Hoja: Resumen General --- 
        if (data.title && data.date && data.duration && data.sentiment && data.participants) {
            const summaryData = [
                { "Métrica": "Título de la Reunión", "Valor": data.title },
                { "Métrica": "Fecha", "Valor": data.date },
                { "Métrica": "Duración", "Valor": data.duration },
                { "Métrica": "Sentimiento General (%)", "Valor": data.sentiment.overall * 100 },
                { "Métrica": "Participantes Totales", "Valor": data.participants.length },
            ];
            const summarySheet = XLSX.utils.json_to_sheet(summaryData, { skipHeader: true });
            summarySheet["!cols"] = [{ wch: 30 }, { wch: 50 }];
            // Estilo para la hoja de resumen
            Object.keys(summarySheet).forEach(cellAddress => {
                if (cellAddress.startsWith('!')) return;
                const cell = summarySheet[cellAddress];
                cell.s = dataStyle; // Estilo base para todas las celdas
                if (cellAddress.startsWith('A')) { // Columna de Métricas
                    cell.s = { ...dataStyle, font: { bold: true } };
                }
                if (cellAddress === 'B4') { // Celda de Sentimiento General
                    cell.t = 'n';
                    cell.z = '0"%"';
                }
            });
            XLSX.utils.book_append_sheet(wb, summarySheet, "Resumen General");
        }

        // --- Hoja: Participantes ---
        if (data.participants && Array.isArray(data.participants)) {
            const participantsData = data.participants.map((p: any) => ({
                Nombre: p.name,
                Rol: p.role,
                'Tiempo Hablado (min)': p.speakingTime,
                'Sentimiento (%)': p.sentiment * 100,
            }));
            const participantsSheet = XLSX.utils.json_to_sheet(participantsData);
            participantsSheet["!cols"] = [{ wch: 25 }, { wch: 20 }, { wch: 20 }, { wch: 18 }];
            Object.keys(participantsSheet).forEach(cellAddress => {
                if (cellAddress.startsWith('!')) return;
                const cell = participantsSheet[cellAddress];
                if (cellAddress[1] === '1' && !cellAddress.includes(':')) { // Fila de encabezado
                    cell.s = headerStyle;
                } else if (parseInt(cellAddress.substring(1)) > 1) { // Filas de datos
                    cell.s = dataStyle;
                    if (cellAddress.startsWith('D')) { // Columna de Sentimiento
                        cell.t = 'n';
                        cell.z = '0"%"';
                    }
                }
            });
            XLSX.utils.book_append_sheet(wb, participantsSheet, "Participantes");
        } else {
            const emptySheet = XLSX.utils.aoa_to_sheet([["Datos de participantes no disponibles"]]);
            XLSX.utils.book_append_sheet(wb, emptySheet, "Participantes");
        }

        // --- Hoja: Sentimientos (Agregado) ---
        if (data.sentiment && data.sentiment.positive !== undefined && data.sentiment.neutral !== undefined && data.sentiment.negative !== undefined) {
            const sentimentBreakdownData = [
                { Tipo: 'Positivo', Valor: data.sentiment.positive },
                { Tipo: 'Neutral', Valor: data.sentiment.neutral },
                { Tipo: 'Negativo', Valor: data.sentiment.negative },
            ];
            const sentimentSheet = XLSX.utils.json_to_sheet(sentimentBreakdownData);
            sentimentSheet["!cols"] = [{ wch: 15 }, { wch: 10 }];
            Object.keys(sentimentSheet).forEach(cellAddress => {
                if (cellAddress.startsWith('!')) return;
                const cell = sentimentSheet[cellAddress];
                if (cellAddress[1] === '1' && !cellAddress.includes(':')) { // Fila de encabezado
                    cell.s = headerStyle;
                } else if (parseInt(cellAddress.substring(1)) > 1) { // Filas de datos
                    const sentimentType = sentimentSheet['A' + cellAddress.substring(1)]?.v;
                    if (sentimentType && (sentimentColors as any)[sentimentType]) {
                        cell.s = { ...dataStyle, fill: (sentimentColors as any)[sentimentType] };
                    } else {
                        cell.s = dataStyle;
                    }
                    if (cellAddress.startsWith('B')) { // Columna de Valor
                        cell.t = 'n';
                        cell.z = '0"%"';
                    }
                }
            });
            XLSX.utils.book_append_sheet(wb, sentimentSheet, "Sentimientos");
        } else {
            const emptySheet = XLSX.utils.aoa_to_sheet([["Datos de sentimientos no disponibles"]]);
            XLSX.utils.book_append_sheet(wb, emptySheet, "Sentimientos");
        }

        // --- Hoja: Datos Gráfico Sentimientos (Línea de Tiempo) ---
        if (data.sentiment && data.sentiment.timeline && Array.isArray(data.sentiment.timeline)) {
            const sentimentTimelineData = data.sentiment.timeline.map((s: any) => ({
                'Tiempo (min)': s.time,
                'Valor Sentimiento': s.value,
                'Tema': s.topic
            }));
            const sentimentTimelineSheet = XLSX.utils.json_to_sheet(sentimentTimelineData);
            sentimentTimelineSheet["!cols"] = [{ wch: 15 }, { wch: 20 }, { wch: 30 }];
            Object.keys(sentimentTimelineSheet).forEach(cellAddress => {
                if (cellAddress.startsWith('!')) return;
                const cell = sentimentTimelineSheet[cellAddress];
                if (cellAddress[1] === '1' && !cellAddress.includes(':')) { // Fila de encabezado
                    cell.s = headerStyle;
                } else if (parseInt(cellAddress.substring(1)) > 1) { // Filas de datos
                    cell.s = dataStyle;
                    if (cellAddress.startsWith('B')) { // Columna de Valor Sentimiento
                        cell.t = 'n';
                        cell.z = '0.00'; // Formato numérico con dos decimales
                    }
                }
            });
            XLSX.utils.book_append_sheet(wb, sentimentTimelineSheet, "Datos Gráfico Sentimientos");
        } else {
            const emptySheet = XLSX.utils.aoa_to_sheet([["Datos de línea de tiempo de sentimientos no disponibles"]]);
            XLSX.utils.book_append_sheet(wb, emptySheet, "Datos Gráfico Sentimientos");
        }

        // --- Hoja: Puntos Clave ---
        if (data.keyPoints && Array.isArray(data.keyPoints)) {
            const keyPointsData = data.keyPoints.map((kp: any) => ({
                'Punto Clave': kp.point,
                'Tiempo': kp.time,
                'Sentimiento Asociado (%)': kp.sentiment * 100
            }));
            const keyPointsSheet = XLSX.utils.json_to_sheet(keyPointsData);
            keyPointsSheet["!cols"] = [{ wch: 50 }, { wch: 15 }, { wch: 25 }];
            Object.keys(keyPointsSheet).forEach(cellAddress => {
                if (cellAddress.startsWith('!')) return;
                const cell = keyPointsSheet[cellAddress];
                if (cellAddress[1] === '1' && !cellAddress.includes(':')) {
                    cell.s = headerStyle;
                } else if (parseInt(cellAddress.substring(1)) > 1) {
                    cell.s = dataStyle;
                    if (cellAddress.startsWith('C')) {
                        cell.t = 'n';
                        cell.z = '0"%"';
                    }
                }
            });
            XLSX.utils.book_append_sheet(wb, keyPointsSheet, "Puntos Clave");
        } else {
            const emptySheet = XLSX.utils.aoa_to_sheet([["Datos de puntos clave no disponibles"]]);
            XLSX.utils.book_append_sheet(wb, emptySheet, "Puntos Clave");
        }

        // --- Hoja: Transcripción (si existe) ---
        if (data.transcript && Array.isArray(data.transcript)) {
            const transcriptData = data.transcript.map((t: any) => ({
                'Tiempo': t.time,
                'Hablante': t.speaker,
                'Texto': t.text,
                'Sentimiento (%)': t.sentiment * 100
            }));
            const transcriptSheet = XLSX.utils.json_to_sheet(transcriptData);
            transcriptSheet["!cols"] = [{ wch: 15 }, { wch: 20 }, { wch: 70 }, { wch: 20 }];
            Object.keys(transcriptSheet).forEach(cellAddress => {
                if (cellAddress.startsWith('!')) return;
                const cell = transcriptSheet[cellAddress];
                if (cellAddress[1] === '1' && !cellAddress.includes(':')) { // Fila de encabezado
                    cell.s = headerStyle;
                } else if (parseInt(cellAddress.substring(1)) > 1) { // Filas de datos
                    cell.s = dataStyle;
                    if (cellAddress.startsWith('D')) { // Columna de Sentimiento
                        cell.t = 'n';
                        cell.z = '0"%"';
                    }
                }
            });
            XLSX.utils.book_append_sheet(wb, transcriptSheet, "Transcripción");
        } else if (data.fullTranscript) {
            const fullTranscriptSheet = XLSX.utils.aoa_to_sheet([["Transcripción Completa"], [data.fullTranscript]]);
            fullTranscriptSheet["!cols"] = [{ wch: 100 }];
            XLSX.utils.book_append_sheet(wb, fullTranscriptSheet, "Transcripción");
        } else {
            const emptySheet = XLSX.utils.aoa_to_sheet([["Datos de transcripción no disponibles"]]);
            XLSX.utils.book_append_sheet(wb, emptySheet, "Transcripción");
        }

        XLSX.writeFile(wb, "analisis_reunion_detallado.xlsx");
    }

    useEffect(() => {
        if (!id) return

        const timer = setTimeout(() => {
            setData({
                id: id,
                title: "Reunión de planificación estratégica Q3",
                type: id?.includes("audio") ? "audio" : "text",
                date: "12 de junio, 2025",
                duration: "45:32",
                participants: [
                    { id: 1, name: "María González", role: "CEO", speakingTime: 15.2, sentiment: 0.7 },
                    { id: 2, name: "Carlos Rodríguez", role: "CTO", speakingTime: 12.5, sentiment: 0.4 },
                    { id: 3, name: "Ana Martínez", role: "CMO", speakingTime: 8.3, sentiment: 0.8 },
                    { id: 4, name: "Juan López", role: "CFO", speakingTime: 9.5, sentiment: 0.3 },
                ],
                sentiment: {
                    overall: 0.65,
                    positive: 65,
                    neutral: 25,
                    negative: 10,
                    timeline: [
                        { time: 0, value: 0.6, topic: "Introducción" },
                        { time: 5, value: 0.7, topic: "Revisión KPIs" },
                        { time: 10, value: 0.4, topic: "Problemas técnicos" },
                        { time: 15, value: 0.2, topic: "Presupuesto" },
                        { time: 20, value: 0.3, topic: "Desacuerdo en estrategia" },
                        { time: 25, value: 0.6, topic: "Resolución" },
                        { time: 30, value: 0.8, topic: "Nuevas ideas" },
                        { time: 35, value: 0.7, topic: "Plan de acción" },
                        { time: 40, value: 0.9, topic: "Conclusiones" },
                        { time: 45, value: 0.8, topic: "Cierre" },
                    ],
                },
                keywords: [
                    { text: "estrategia", value: 25 },
                    { text: "presupuesto", value: 18 },
                    { text: "innovación", value: 16 },
                    { text: "mercado", value: 14 },
                    { text: "competencia", value: 12 },
                    { text: "clientes", value: 10 },
                    { text: "producto", value: 9 },
                    { text: "ventas", value: 8 },
                    { text: "equipo", value: 7 },
                    { text: "objetivos", value: 7 },
                    { text: "crecimiento", value: 6 },
                    { text: "desarrollo", value: 6 },
                    { text: "marketing", value: 5 },
                    { text: "tecnología", value: 5 },
                    { text: "inversión", value: 4 },
                ],
                topics: [
                    { id: 1, name: "Revisión de KPIs", time: "00:03:15", duration: "08:45", sentiment: 0.7 },
                    { id: 2, name: "Estrategia de marketing", time: "00:12:00", duration: "10:20", sentiment: 0.8 },
                    { id: 3, name: "Presupuesto Q3", time: "00:22:30", duration: "12:15", sentiment: 0.3 },
                    { id: 4, name: "Nuevos productos", time: "00:35:00", duration: "08:20", sentiment: 0.9 },
                ],
                keyMoments: [
                    { time: "00:08:45", description: "Decisión sobre campaña digital", sentiment: 0.8, importance: 0.9 },
                    { time: "00:15:30", description: "Desacuerdo sobre asignación de recursos", sentiment: 0.2, importance: 0.8 },
                    { time: "00:27:15", description: "Propuesta de nuevo producto", sentiment: 0.9, importance: 0.95 },
                    { time: "00:38:20", description: "Acuerdo final sobre presupuesto", sentiment: 0.7, importance: 0.85 },
                ],
                transcript: [
                    {
                        time: "00:00:15",
                        speaker: "María González",
                        text: "Buenos días a todos, gracias por unirse a esta reunión de planificación estratégica para el tercer trimestre.",
                    },
                    {
                        time: "00:00:30",
                        speaker: "Carlos Rodríguez",
                        text: "Gracias María. Tengo preparada la presentación con los KPIs actuales.",
                    },
                    {
                        time: "00:00:45",
                        speaker: "Ana Martínez",
                        text: "Excelente, también quiero discutir las nuevas estrategias de marketing que hemos estado desarrollando.",
                    },
                    {
                        time: "00:01:00",
                        speaker: "Juan López",
                        text: "Necesitamos revisar cuidadosamente el presupuesto para este trimestre, hay algunas preocupaciones que debemos abordar.",
                    },
                ],
                summary:
                    "La reunión se centró en la planificación estratégica para el Q3, con énfasis en nuevas iniciativas de marketing y revisión de presupuesto. Se identificaron desafíos en la asignación de recursos, pero se llegó a un consenso sobre las prioridades. El equipo mostró entusiasmo por el lanzamiento de nuevos productos y se establecieron objetivos claros para el próximo trimestre. El sentimiento general fue positivo, con algunos momentos de tensión durante la discusión del presupuesto.",
            })
            setLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [id])

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section)
    }

    if (loading) {
        return (
            <div className="container py-8 space-y-8 mx-auto max-md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-24" />
                    </div>
                </div>

                <Skeleton className="h-[400px] w-full rounded-lg" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Skeleton className="h-40 rounded-lg" />
                    <Skeleton className="h-40 rounded-lg" />
                    <Skeleton className="h-40 rounded-lg" />
                </div>
            </div>
        )
    }

    const getSentimentColor = (value: number) => {
        if (value >= 0.7) return "text-green-500 dark:text-green-400"
        if (value >= 0.4) return "text-amber-500 dark:text-amber-400"
        return "text-red-500 dark:text-red-400"
    }

    const getSentimentIcon = (value: number) => {
        if (value >= 0.7) return <Smile className="h-5 w-5" />
        if (value >= 0.4) return <Meh className="h-5 w-5" />
        return <Frown className="h-5 w-5" />
    }

    return (
        <div className="container py-8 space-y-8 mx-auto max-lg:px-4">
            <motion.div
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold max-md:text-2xl">{data.title}</h1>
                        {data.type === "audio" ? (
                            <Volume2 className="h-5 w-5 text-primary" />
                        ) : (
                            <FileText className="h-5 w-5 text-primary" />
                        )}
                    </div>
                    <p className="text-muted-foreground">
                        {data.date} • {data.duration} • {data.participants.length} participantes
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 cursor-pointer" onClick={exportToExcel}>
                        <Download className="h-4 w-4" />
                        Exportar
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => share({
                            title: data.title,
                            text: 'Resumen de la reunión',
                            url: window.location.href
                        })}
                        disabled={isSharing}
                    >
                        <Share2 className="h-4 w-4" />
                        Compartir
                    </Button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div custom={0} initial="hidden" animate="visible" >
                    <Card className="overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Duración</p>
                                    <div className="text-2xl font-bold">{data.duration}</div>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div custom={1} initial="hidden" animate="visible" >
                    <Card className="overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Participantes</p>
                                    <div className="text-2xl font-bold">{data.participants.length}</div>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div custom={2} initial="hidden" animate="visible">
                    <Card className="overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Sentimiento</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-2xl font-bold ${getSentimentColor(data.sentiment.overall)}`}>
                                            {Math.round(data.sentiment.overall * 100)}%
                                        </span>
                                        <span className={getSentimentColor(data.sentiment.overall)}>
                                            {getSentimentIcon(data.sentiment.overall)}
                                        </span>
                                    </div>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div custom={3} initial="hidden" animate="visible">
                    <Card className="overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Temas</p>
                                    <div className="text-2xl font-bold">{data.topics.length}</div>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <MessageSquare className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="max-md:mt-26">
                <Tabs defaultValue="sentiment" className="space-y-8">
                    <TabsList className="flex flex-col gap-2 h-13 md:grid md:grid-cols-5 md:gap-0 mb-8 max-md:mb-12 w-full">
                        <TabsTrigger value="sentiment" className="w-full flex items-center justify-center py-2 text-lg md:text-base cursor-pointer">Sentimientos</TabsTrigger>
                        <TabsTrigger value="keywords" className="w-full flex items-center justify-center py-2 text-lg md:text-base cursor-pointer">Palabras clave</TabsTrigger>
                        <TabsTrigger value="participants" className="w-full flex items-center justify-center py-2 text-lg md:text-base cursor-pointer">Participantes</TabsTrigger>
                        <TabsTrigger value="topics" className="w-full flex items-center justify-center py-2 text-lg md:text-base cursor-pointer">Temas</TabsTrigger>
                        <TabsTrigger value="transcript" className="w-full flex items-center justify-center py-2 text-lg md:text-base cursor-pointer">Transcripción</TabsTrigger>
                    </TabsList>

                    <TabsContent value="sentiment" className="space-y-8">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Análisis de sentimientos</h2>
                                <div className="h-[400px]">
                                    <SentimentTimeline data={data.sentiment.timeline} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                                    <div className="text-green-500 dark:text-green-400 text-4xl font-bold mb-2">
                                        {data.sentiment.positive}%
                                    </div>
                                    <div className="text-center">
                                        <Smile className="h-8 w-8 mx-auto text-green-500 dark:text-green-400 mb-2" />
                                        <p className="text-sm font-medium">Sentimiento positivo</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                                    <div className="text-amber-500 dark:text-amber-400 text-4xl font-bold mb-2">
                                        {data.sentiment.neutral}%
                                    </div>
                                    <div className="text-center">
                                        <Meh className="h-8 w-8 mx-auto text-amber-500 dark:text-amber-400 mb-2" />
                                        <p className="text-sm font-medium">Sentimiento neutral</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                                    <div className="text-red-500 dark:text-red-400 text-4xl font-bold mb-2">
                                        {data.sentiment.negative}%
                                    </div>
                                    <div className="text-center">
                                        <Frown className="h-8 w-8 mx-auto text-red-500 dark:text-red-400 mb-2" />
                                        <p className="text-sm font-medium">Sentimiento negativo</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Momentos clave</h3>
                                <div className="space-y-4">
                                    {data.keyMoments.map((moment: any, index: number) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1, duration: 0.5 }}
                                            className="flex items-center gap-4 p-3 rounded-lg border"
                                        >
                                            <div className="flex-shrink-0 w-16 text-sm font-medium">{moment.time}</div>
                                            <div className="flex-grow">
                                                <p className="font-medium">{moment.description}</p>
                                            </div>
                                            <div className="flex-shrink-0 flex items-center gap-2">
                                                <Badge
                                                    variant={
                                                        moment.sentiment > 0.6 ? "default" : moment.sentiment > 0.4 ? "outline" : "destructive"
                                                    }
                                                >
                                                    {Math.round(moment.importance * 100)}% relevante
                                                </Badge>
                                                <span className={getSentimentColor(moment.sentiment)}>
                                                    {getSentimentIcon(moment.sentiment)}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="keywords">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Palabras clave</h2>
                                <div className="h-[500px]">
                                    <KeywordsCloud keywords={data.keywords} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="participants">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Análisis de participantes</h2>
                                <ParticipantAnalysis participants={data.participants} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="topics">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Desglose de temas</h2>
                                <TopicBreakdown topics={data.topics} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="transcript">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Transcripción</h2>
                                <TranscriptViewer transcript={data.transcript} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("summary")}>
                            <h2 className="text-xl font-semibold">Resumen ejecutivo</h2>
                            {activeSection === "summary" ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                        </div>

                        {activeSection === "summary" && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4"
                            >
                                <p className="text-muted-foreground">{data.summary}</p>

                                <div className="mt-6">
                                    <h3 className="font-medium mb-2">Próximos pasos recomendados:</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                            <span>Programar seguimiento sobre estrategias de marketing</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                            <span>Finalizar presupuesto Q3</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                            <span>Iniciar proceso de contrataciones</span>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default Results